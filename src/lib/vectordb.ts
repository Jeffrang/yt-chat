import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import md5 from 'md5';
import { convertToAscii } from './utils';
import { getEmbeddings } from './llm';

let pinecone: Pinecone;

const pineconeInit = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    });
  }
  return pinecone;
}

const embedDocument = async (doc: Document) => {
  const embeddings = await getEmbeddings(doc.pageContent);
  const hash = md5(doc.pageContent);

  console.log('metadata', JSON.stringify(doc.metadata));

  return {
    id: hash,
    values: embeddings,
    metadata: {
      videoUrl: doc.metadata.videoUrl,
      chatId: doc.metadata.chatId,
      text: doc.pageContent,
    }
  } as PineconeRecord;
}

const prepareDocument = async (text: string, metadata: any) => {
  const strippedContent = text.replace(/\n/g, '');
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 10,
    separators: ["|", "##", ">", "-"],
  });
  const docs = splitter.splitDocuments([
    new Document({
      pageContent: strippedContent,
      metadata: {
        videoUrl: metadata.videoUrl,
        chatId: metadata.chatId,
      }
    })
  ]);

  return docs;
}

export const loadTranscriptIntoVectorDB = async (videoUrl: string, transcript: any[], chatId: string) => {
  // console.log('transcript', transcript);
  const pages = transcript.map((page: any) => page.text);
  const docs = await prepareDocument(pages.join('\n'), { videoUrl, chatId });
  // console.log('docs', docs);
  const vectors = await Promise.all(docs.flat().map(embedDocument));

  const pineconeClient = await pineconeInit();
  const index = pineconeClient.index('yt-chat');
  const id = convertToAscii(chatId);
  const namespace = index.namespace(`yt-${id}`);
  await namespace.upsert(vectors);

  return {
    document: docs[0],
  };
}

const getMatchesWithEmbedings = async (embeddings: number[], chatId: string) => {
  const pineconeClient = await pineconeInit();
  const index = pineconeClient.index('yt-chat');
  try {
    const id = convertToAscii(chatId);
    const queryResults = await index.namespace(`yt-${id}`).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResults.matches || [];
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};

export const getContext = async (text: string, chatId: string) => {
  const embeddings = await getEmbeddings(text);
  const matches = await getMatchesWithEmbedings(embeddings, chatId);
  const qualifiedMatches = matches.filter((match: any) => {
    return match.score > 0.3;
  });

  const docs = qualifiedMatches.map((match: any) => (match.metadata.text));
  return docs.join('\n').substring(0, 3000);
};

export const deleteEmbeddingsById = async (chatId: string) => {
  const pineconeClient = await pineconeInit();
  const index = pineconeClient.index('yt-chat');
  const id = convertToAscii(chatId);
  const namespace = index.namespace(`yt-${id}`);
  await namespace.deleteAll();
};
