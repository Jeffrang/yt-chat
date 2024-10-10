import YoutubeSearch from 'youtube-search-api';
import { NextRequest, NextResponse } from 'next/server';
import { getVideoId } from '../../../lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log('searchParams', searchParams);
  const query = searchParams.get('query') as string;
  const isVideo = searchParams.get('isVideo') as string;
  if (isVideo) {
    const videoId = getVideoId(query);
    const results = await YoutubeSearch.GetVideoDetails(videoId);
    console.log('yt search results ', results);
    return NextResponse.json(results);
  }
  const results = await YoutubeSearch.GetListByKeyword(query, false, 5);
  console.log('yt search results ', results);
  return NextResponse.json(results);
}
