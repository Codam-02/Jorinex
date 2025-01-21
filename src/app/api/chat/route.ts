export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { waitUntil } from '@vercel/functions';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "86400 s"),
  prefix: "@upstash/ratelimit",
  analytics: true
});

export async function POST(req: Request) {
  const { messages, user_id } = await req.json();
  if (user_id != process.env.ADMIN_USER_ID) {
    const identifier = user_id;
    const { success, limit, remaining, pending } = await ratelimit.limit(identifier);
    const response = {
      success: success,
      limit: limit, 
      remaining: remaining
    }
  
    waitUntil(pending);
      
    if (!success) {
      return new Response(JSON.stringify(response), { status: 429 });
    };
  }

  const result = streamText({
    model: openai('gpt-4o'),
    system: "You are an assistant specializing in writing various types of structured messages. Include all sense-making content requested by the user, and if additional context or details seem helpful, enclose them in square brackets for the user to modify or replace as needed.",
    messages,
  });

  return result.toDataStreamResponse();
}