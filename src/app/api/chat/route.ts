import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: "You are an assistant specializing in writing various types of structured messages. Include all sense-making content requested by the user, and if additional context or details seem helpful, enclose them in square brackets for the user to modify or replace as needed.",
    messages,
  });

  return result.toDataStreamResponse();
}