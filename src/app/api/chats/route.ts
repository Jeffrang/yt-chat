import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { currentUser } from '@clerk/nextjs/server';
import { getChatsByUserId } from '@/lib/datastore';

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({
      body: 'Unauthorized',
    }, {
      status: 401,
    });
  }

try {
  const chats = await getChatsByUserId(user.id);
  // console.log('chats', chats);
  return NextResponse.json({
    body: chats
  });
} catch (error) {
  console.error('Error fetching chat:', error);
  return NextResponse.json({
    body: 'Error fetching chat',
  }, {
    status: 500,
  });
}
}
