'use client';

import ChatComponent from '../../../components/ChatComponent';
import LeftNavigation from '../../../components/LeftNavigation';
import { UserButton } from '@clerk/nextjs';

const ChatPage = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <div className='flex flex-1'>
        <div className='w-1/6 bg-gradient-to-b from-rose-100 to-teal-100'>
          <LeftNavigation />
        </div>
        <div className='bg-white flex-1 flex flex-col'>
          <div className='p-4 bg-transparent text-gray-800 flex justify-between items-center'>
            <h1 className='ml-2 text-2xl font-bold'>Youtube Chat</h1>
            <div className='action-menu'>
              <UserButton />
            </div>
          </div>
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
