'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { useParams, useRouter } from 'next/navigation';
import MessageSection from './MessagesContainer';
import InputSection from './InputSection';

type ChatData = {
  id: string;
  slug: string;
  title: string;
  videoUrl: string;
  chatHistory: any[];
};

const ChatComponent: React.FC = () => {
  const chatId = useParams().chatId as string;
  const router = useRouter();

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const placeholderData = [
    "What is this video about?",
    "Summarize this video in 5 points",
    "What are the key takeaways?",
    "Explain the main concept in detail"
  ];

  const [chatData, setChatData] = useState<ChatData | null>(null);

  useEffect(() => {
    fetch(`/api/chats/${chatId}`)
      .then(response => {
        console.log('response', response);
        if (response.status === 404) {
          router.push('/error/404');
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setChatData(data.body);
        }
      })
      .catch(() => setChatData(null));
  }, [chatId, router]);

  const handlePlaceholderClick = (text: string) => {
    handleInputChange({ target: { value: text } } as React.ChangeEvent<HTMLTextAreaElement>);
    handleSubmit({ preventDefault: () => { } } as React.FormEvent<HTMLFormElement>);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(true);
    }
    if (event.key === 'Enter' && !isShiftPressed) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Shift') {
      setIsShiftPressed(false);
    }
  };

  const isNew = chatId === 'new';

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { chatId },
    initialMessages: chatData?.chatHistory || [],
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex flex-col h-full justify-between w-full mx-auto">
      <div className="flex flex-col h-full justify-between w-full mx-auto">
        {chatData ? (
          <MessageSection
            messages={messages}
            placeholderData={placeholderData}
            handlePlaceholderClick={handlePlaceholderClick}
            isLoading={isLoading}
            chatData={chatData}
          />
        ): <div></div>}
        <InputSection
          disabled={isNew}
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
