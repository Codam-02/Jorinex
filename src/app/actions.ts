'use server'

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function fetchChats(user_id: string) {
    const chats = await redis.json.get('chats_' + user_id);
    return chats;
};