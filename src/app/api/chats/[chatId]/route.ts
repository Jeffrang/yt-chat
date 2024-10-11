import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { currentUser } from '@clerk/nextjs/server';
import { getChatById, deleteChatById } from '@/lib/datastore';
import { deleteEmbeddingsById } from '@/lib/vectordb';

export async function GET(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({
      body: 'Unauthorized',
    }, {
      status: 401,
    });
  }

  try {
    const chat = await getChatById(chatId, user.id);
    console.log('chat', chat);
    return NextResponse.json({
      body: {
        id: chat.chat_id,
        slug: chat.chat_slug,
        title: chat.chat_name,
        videoUrl: chat.video_url,
        chatHistory: chat.message_history,
      }
    });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return NextResponse.json({
      body: 'Chat not found',
    }, {
      status: 404,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({
      body: 'Unauthorized',
    }, {
      status: 401,
    });
  }

  try {
    await deleteChatById(chatId, user.id);
    await deleteEmbeddingsById(chatId);
    return NextResponse.json({
      body: 'Chat deleted',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json({
      body: 'Chat not found',
    }, {
      status: 404,
    });
  }
}
