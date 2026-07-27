import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req) {
  const { message } = await req.json();

  // 1. Cek toxic dulu
  const moderation = await streamText({
    model: openai('gpt-4o-mini'),
    system: 'Kamu adalah moderator. Jawab "TOXIC" jika pesan mengandung hate speech, kalau aman jawab "AMAN"',
    prompt: message,
  });

  // 2. Kalau aman, kasih saran balasan
  const reply = await streamText({
    model: openai('gpt-4o'),
    system: 'Kamu adalah asisten yang ramah. Buat 3 opsi balasan singkat untuk pesan anonim ini',
    prompt: message,
  });

  return reply.toDataStreamResponse();
}
