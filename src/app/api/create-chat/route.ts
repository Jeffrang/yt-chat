import { NextResponse } from "next/server";
/* -----------------Globals--------------- */
import { NextRequest } from "next/server";

/* -----------------Helpers & Hooks--------------- */
import { buffer } from "@/lib/utils";
import { loadTranscriptIntoVectorDB } from "@/lib/vectordb";
import { createChat } from "@/lib/datastore";
import { currentUser } from '@clerk/nextjs/server';

/* -----------------Third-party Libraries--------------- */
import { YoutubeTranscript } from 'youtube-transcript';
// tslint:disable-next-line
import YoutubeMetadata from 'youtube-meta-data';
import { getVideoId } from '@/lib/utils';


export async function POST(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({
      body: 'Unauthorized',
    }, {
      status: 401,
    });
  }
  const userId = user.id;
  const reqBuffer = await buffer(request.body);
  const reqBody = await reqBuffer.toString();
  const { videoUrl } = JSON.parse(reqBody);
  const metadata = await YoutubeMetadata(videoUrl);

  const videoDeatails = {
    name: metadata.title,
    slug: getVideoId(videoUrl),
    url: videoUrl,
  };

  const chat = await createChat(userId, videoDeatails);
  if (!chat) {
    return NextResponse.json({
      body: 'Error creating chat',
    }, {
      status: 500,
    });
  }

  console.log('chat', chat);
  const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
  await loadTranscriptIntoVectorDB(videoUrl, transcript, chat.chat_id);
  return NextResponse.json({
    chatId: chat.chat_id,
  });
}
