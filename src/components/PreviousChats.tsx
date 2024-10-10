'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PreviousChats: React.FC = () => {
  const [chats, setChats] = useState<{ chat_id: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chats');
        if (response.ok) {
          const data = await response.json();
          setChats(data.body);
        } else {
          console.error('Failed to fetch chats');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchChats();
  }, []);

  const handleNavigateToLatestChat = () => {
    if (chats.length > 0) {
      router.push(`/chat/${chats[0].chat_id}`);
    }
  };

  return (
    <div>
      {chats.length > 0 && (
        <button onClick={handleNavigateToLatestChat} className="px-4 py-2 bg-gray-900 text-white rounded">
          Go To My Chats -&gt;
        </button>
      )}
    </div>
  );
};

export default PreviousChats;
