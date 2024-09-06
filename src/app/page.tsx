import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from 'next/link';
import { LogInIcon } from 'lucide-react';
import YTLinkInput from '../components/YTLinkInput';

export default async function Home() {

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='w-full flex items-center justify-between p-4'>
        <h1 className='text-2xl font-bold text-gray-800'>YT Chat</h1>
        <div className='flex items-center'>
          <UserButton showName={true}/>
        </div>
      </div>
      <div className='flex flex-col items-center justify-start w-full pt-16'>
        <h1 className='mt-8 text-6xl font-extrabold text-center text-gray-800 mb-4'>
          Chat with Youtube
        </h1>
        <p className='mt-8 text-xl text-center text-gray-600'>
          Connect and chat with your favorite YouTube videos.
        </p>
        <p className='mt-3 text-xl text-center text-gray-600 mb-12'>
          Enter a YouTube URL to get started.
        </p>

        <div className='w-full flex items-center justify-center mt-8'>
          <SignedIn>
            <div className='w-full max-w-lg p-4 bg-white rounded-2xl shadow-md'>
              <YTLinkInput />
            </div>
          </SignedIn>
          <SignedOut>
              <Link href="" className='bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800'>
              <SignInButton>
                <div className="flex items-center p-2">
                  <p>Sign In to Get started </p>
                  <LogInIcon className='w-4 h-4 ml-2' />
                </div>
              </SignInButton>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
