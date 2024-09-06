export const chunkVectors = (vectors: number[], chunkSize: number) => {
  const chunks = Array(Math.ceil(vectors.length / chunkSize)).fill(0).map((_, index) => index * chunkSize).map(begin => vectors.slice(begin, begin + chunkSize));
  return chunks;
}

export const convertToAscii = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

export const getVideoId = (videoUrl: string) => videoUrl.includes('youtu.be') ? videoUrl.split('/').pop()! : videoUrl.split('=')[1]!;

export const truncateStringByBytes = (str: string, numBytes: number) => {
  const enc = new TextEncoder();
  const bytes = enc.encode(str);
  if (bytes.length <= numBytes) {
    return str;
  }
  const truncatedBytes = bytes.slice(0, numBytes);
  return new TextDecoder().decode(truncatedBytes);
}

export async function buffer(readable: ReadableStream<Uint8Array> | null) {
  if (!readable) {
    throw new Error('ReadableStream is null');
  }

  const reader = readable.getReader();
  const chunks: Uint8Array[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (value) {
      chunks.push(value);
    }
  }

  return Buffer.concat(chunks).toString('utf8');
}
