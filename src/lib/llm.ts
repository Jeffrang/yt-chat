import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export const getEmbeddings = async (text: string) => {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY || '',
    model: "text-embedding-004", // 768 dimensions
  });
  return embeddings.embedQuery(text);
};
