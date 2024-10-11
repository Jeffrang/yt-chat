import { useEffect, useRef, useState } from 'react';
import { Message } from '@ai-sdk/ui-utils';
import YouTube from 'react-youtube';
import MessageItem from '@/components/MessageItem';

interface MessageSectionProps {
  messages: Message[];
  placeholderData: string[];
  handlePlaceholderClick: (text: string) => void;
  isLoading: boolean;
  chatData: ChatData | null;
}

type ChatData = {
  id: string;
  slug: string;
  title: string;
  videoUrl: string;
  chatHistory: any[];
};

const MessageSection: React.FC<MessageSectionProps> = ({ chatData, messages, placeholderData, handlePlaceholderClick, isLoading }) => {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="mx-auto w-full overflow-y-scroll" style={{ maxHeight: 'calc(100vh - 230px)' }}>
      <div className='flex justify-center h-72 max-w-lg w-full mx-auto rounded-md mt-4 mb-4'>
        {chatData && (
          <YouTube
            iframeClassName="yt-chat-player"
            videoId={chatData?.slug}
            opts={{
              height: '270',
              width: '520',
              playerVars: {
                autoplay: 0,
                controls: 0,
                rel: 0,
                showinfo: 0,
                modestbranding: 1,
              },
            }}
          />
        )}
      </div>
      <div className="flex flex-col flex-1 justify-center mx-auto max-w-2xl">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <MessageItem message={msg} key={msg.id} />
          ))
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg mx-auto place-items-center">
            {placeholderData.map((text, index) => (
              <div
                key={index}
                className="w-64 h-20 p-4 bg-gray-100 rounded cursor-pointer transition-transform transform hover:scale-105 flex items-center justify-center"
                onClick={() => handlePlaceholderClick(text)}
              >
                {text}
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
        {isLoading && messages.length > 0 && messages.length % 2 !== 0 && (
          <div className="bg-gradient-to-r from-rose-100 to-teal-100 self-start text-left rounded-2xl flex justify-center items-center p-4">
            <div className="spinner-border border-gray-200 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden text-gray-600">.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSection;
