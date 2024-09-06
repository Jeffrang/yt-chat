import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '@ai-sdk/ui-utils';
import YouTube from 'react-youtube';
import { User, Bot } from 'lucide-react';

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
      <div className='flex justify-center h-72 max-w-lg w-full mx-auto rounded-md mb-4'>
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
          messages.map((m) => (
            <div className={`flex items-start ${m.role === 'user'
                  ? 'self-end text-right'
                  : 'self-start text-left'
                  } relative`} key={m.id} >
              {m.role === 'user' ? (
                <>
                  <div
                    className={`flex items-start whitespace-pre-wrap p-4 rounded-2xl mb-4 max-w-2xl bg-gray-100 self-end text-right`}
                    style={{ alignSelf: 'flex-end' }}
                  >
                    <div>{m.content}</div>
                  </div>
                  <div className="absolute top-0 right-[-60px] mt-2 mr-2 p-2 rounded-full bg-white border border-gray-300">
                    <User />
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-0 left-[-60px] mt-2 ml-2 p-2 rounded-full bg-white border border-gray-300">
                    <Bot />
                  </div>
                  <div
                    className={`flex items-start whitespace-pre-wrap p-4 rounded-2xl mb-4 max-w-2xl bg-gradient-to-r from-rose-100 to-teal-100 self-start text-left`}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <div>
                      <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>
                    </div>
                  </div>
                </>
              )}
          </div>
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
