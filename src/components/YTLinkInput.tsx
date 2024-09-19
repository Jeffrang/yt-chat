'use client';

import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const YTLinkInput = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  const loadingMessages = useMemo(() => [
    'Fetching youtube video info...',
    'Processing video transcripts...',
    'Creating chat...',
    'Chat created successfully!',
  ], []);

  // useEffect(() => {
  //   const fetchUserChats = async () => {
  //     const response = await fetch(`/api/chats`);
  //     if (response.ok) {
  //       const chats = await response.json();
  //       if (chats.body.length > 0) {
  //         router.push(`/chat/${chats.body[0].chat_id}`);
  //       }
  //     }
  //   };

  //   fetchUserChats();
  // }, [router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => {
          if (prevIndex < loadingMessages.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading, loadingMessages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: youtubeUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const data: { chatId: string } = await response.json();
      const { chatId } = data;

      router.push(`/chat/${chatId}`);
      setErrMsg('');
    } catch (error) {
      console.error('Error:', error);
      setErrMsg('Failed to create chat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="url"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
          className="p-3 border border-gray-300 rounded w-96"
          required
        />
        <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded">
          Start
        </button>
      </form>
      {loading && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <div className="spinner-border border-gray-200 animate-spin inline-block w-4 h-4 border-2 rounded-full" role="status"></div>
          <span className="text-gray-600 font-semibold">{loadingMessages[currentMessageIndex]}</span>
        </div>
      )}
      {errMsg && !loading && <div className="mt-4 text-gray-600 font-semibold">{errMsg}</div>}
    </div>
  );
};

export default YTLinkInput;
