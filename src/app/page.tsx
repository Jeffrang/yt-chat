import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from 'next/link';
import { LogInIcon } from 'lucide-react';
import YTLinkInput from '../components/YTLinkInput';
import PreviousChats from '../components/PreviousChats';
import Image from 'next/image';

export default async function Home() {

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='w-full flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <Image src='/icon.png' alt='Icon' width={24} height={24} className='mr-2' />
          <h1 className='text-2xl font-bold text-gray-800'>Youtube Chat</h1>
        </div>
        <div className='flex items-center'>
          <UserButton showName={true}/>
        </div>
      </div>
      <div className='flex flex-col items-center justify-start w-full pt-16'>
        <h1 className='mt-8 text-6xl font-extrabold text-center text-gray-800 mb-4'>
          Chat with Youtube
        </h1>
        <p className='mt-8 text-xl text-center text-gray-600'>
          Connect and chat with your favorite Youtube videos.
        </p>
        <p className='mt-3 text-xl text-center text-gray-600 mb-12'>
          Search or enter a Youtube link to get started.
        </p>

        <div className='w-full flex flex-col items-center justify-center mt-8'>

            <div className='w-full max-w-lg p-4 mb-8 bg-white rounded-2xl shadow-md'>
              <YTLinkInput />
            </div>
          <SignedIn>
            <PreviousChats />
          </SignedIn>
            <SignedOut>
            <Link
              href="/auth/login"
              className='bg-gray-900 text-white font-bold rounded hover:bg-gray-800'
            >
              <div className="flex items-center p-4">
                <p>Sign In to Get started </p>
                <LogInIcon className='w-4 h-4 ml-2' />
              </div>
            </Link>
          </SignedOut>
        </div>
      </div>
      <div className="absolute bottom-8 w-full text-center text-gray-500">
        Youtube chat works best with English language videos. <br />
        If chat creation fails, please try again later or with a different video.
      </div>
    </div>
  )
}
