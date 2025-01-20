'use server'

import { Redis } from "@upstash/redis";
import { Message } from "ai";

const redis = Redis.fromEnv();

export async function fetchChats(user_id: string) {
    const chats = await redis.json.get('chats_' + user_id);
    return chats;
};

export async function postMessages(user_id: string, chat_id: number, messages: Message[]) {
    function transformMessagesToRecords(messages: Message[]): Record<string, unknown>[] {
        return messages.map((message) => ({
          id: message.id,
          content: message.content,
          role: message.role,
        }));
    }
    const records = transformMessagesToRecords(messages);
    redis.json.set('chats_' + user_id, `$.${chat_id}.messages`, records);
};