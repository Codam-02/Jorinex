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
    const str_chat_id = chat_id.toString();
    const chats: object|null= await redis.json.get('chats_' + user_id);
    if (chats && chats.hasOwnProperty(str_chat_id)) {
        redis.json.set('chats_' + user_id, '$.' + str_chat_id + '.messages', records);
    }
    else {
        const newEntry = {...(chats ?? {}), [str_chat_id]: {'messages': records, 'chatname': 'chat ' + str_chat_id}};
        redis.json.set('chats_' + user_id, '$', newEntry);
    }
};

export async function editChatName(user_id: string, chat_id: number, newName: string) {
    const str_chat_id = chat_id.toString();
    redis.json.set('chats_' + user_id, '$.' + str_chat_id + '.chatname', newName);
};

export async function deleteChat(user_id: string, chat_id: number) {
    const str_chat_id = chat_id.toString();
    redis.json.del('chats_' + user_id, '$.' + str_chat_id);
};