import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
// import QueryProvider from '../components/QueryProvider';
import { Inter } from 'next/font/google'
// import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YT Chat',
  description: 'Chat with Youtube Videos',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      {/* <QueryProvider> */}
        <html lang="en">
          <body className={inter.className}>
            {children}
            {/* <Toaster /> */}
          </body>
        </html>
      {/* </QueryProvider> */}
    </ClerkProvider>
  )
}
