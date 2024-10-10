'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import ChatComponent from '../../../components/ChatComponent';
import LeftNavigation from '../../../components/LeftNavigation';
import { UserButton } from '@clerk/nextjs';

const ChatPage = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <SignedIn>
        <div className='flex flex-1'>
          <div className='w-1/6 bg-gradient-to-b from-rose-100 to-teal-100'>
            <LeftNavigation />
          </div>
          <div className='bg-white flex-1 flex flex-col'>
            <div className='p-4 bg-transparent text-gray-800 flex justify-between items-center'>
              <div className='flex items-center'>
                <img src='/icon.png' alt='Icon' className='w-6 h-6 mr-2' />
                <h1 className='text-xl font-bold text-gray-800'>Youtube Chat</h1>
              </div>
              <div className='action-menu'>
                <UserButton />
              </div>
            </div>
            <ChatComponent />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default ChatPage;
