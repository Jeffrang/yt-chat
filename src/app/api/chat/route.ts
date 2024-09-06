import { google } from '@ai-sdk/google';
import { streamText, convertToCoreMessages } from 'ai';
import { getContext } from '@/lib/vectordb';
import { SYSTEM_PROMPT } from '@/lib/constants';
import { updateChat } from '@/lib/datastore';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({
      body: 'Unauthorized',
    }, {
      status: 401,
    });
  }
  console.log('POST request received');
  const { messages, chatId } = await req.json();
  const lastMessage = messages[messages.length - 1];
  const context = await getContext(lastMessage.content, chatId);
  let systemPrompt = SYSTEM_PROMPT.replace('{{videoContext}}', context);
  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    onFinish: async(result) => {
      console.log('onFinish result', result);
      const updatedMessages = [
        ...messages,
        {
          role: 'assistant',
          content: result.text,
        },
      ];
      console.log('updatedMessages', updatedMessages);
      const response = await updateChat(chatId, user.id, updatedMessages);
      console.log('response', response);
    },
  });

  return result.toDataStreamResponse();
}
