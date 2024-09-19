import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { auth } from '@clerk/nextjs/server';


export function createClerkSupabaseClient() {
  const { getToken } = auth();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    global: {
      // Get the custom Supabase token from Clerk
      fetch: async (url, options = {}) => {
        const clerkToken = await getToken({
          template: 'supabase',
        })

        // Insert the Clerk Supabase token into the headers
        const headers = new Headers(options?.headers)
        headers.set('Authorization', `Bearer ${clerkToken}`)

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        })
      },
    }
  });
}

export async function getChatsByUserId(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }

  return data;
}

export async function getChatById(chatId: string, userId: string) {
  if (!chatId || !userId) {
    throw new Error('Chat ID and user ID are required');
  }

  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('chat_id', chatId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching chat:', error);
    throw error;
  }

  return data[0];
}

export async function getChatBySlug(slug: string, userId: string) {
  if (!slug || !userId) {
    throw new Error('Chat ID and user ID are required');
  }

  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('chat_slug', slug)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching chat:', error);
    throw error;
  }

  return data;
}

export async function createChat(userId: string, videoDetails: any) {
  if (!userId) {
    throw new Error('Chat ID and user ID are required');
  }

  const { name, slug, url } = videoDetails;

  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('chats')
    .insert({
      chat_id: nanoid(8),
      created_at: new Date().toISOString(),
      user_id: userId,
      chat_name: name,
      chat_slug: slug,
      video_url: url,
      message_history: [],
    })
    .select();

    // console.log('data', data);

  if (error) {
    console.error('Error creating chat:', error);
    throw error;
  }

  return data[0];
}

export async function updateChat(chatId: string, userId: string, chatHistory: any[]) {
  if (!chatId || !userId) {
    throw new Error('Chat ID and user ID are required');
  }

  if (!chatHistory) {
    throw new Error('Chat history is required');
  }
  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('chats')
    .update({
      message_history: chatHistory,
    })
    .eq('chat_id', chatId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating chat:', error);
    throw error;
  }

  return data;
}
