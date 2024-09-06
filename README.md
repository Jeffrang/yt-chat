# Youtube Chat

This is a Youtube Chat project built with [Next.js](https://nextjs.org/). It allows users to connect and chat with their favorite YouTube videos.

## Tech Stack

- Next.js
- React
- Clerk for authentication
- Tailwind CSS for styling
- Lucide-react for icons
- Supabase for Storage
- Pinecone for Vector Database
- Gemini for AI Models

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm, yarn, pnpm, or bun (any one of these package managers)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jefreesujit/yt-chat.git
   cd chat-with-video
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory and add the necessary environment variables:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_HOST=your_pinecone_host
   GOOGLE_API_KEY=your_google_api_key
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_generative_ai_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application running.
