// src/myContext.ts
import { Context, SessionFlavor } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";
import { HydrateFlavor } from "@grammyjs/hydrate";

// Определяем тип сессии
export type MySession = {
    selected?: string;
};

// Обновляем тип контекста, добавляя поддержку сессий
export type MyContextConversation = Context & SessionFlavor<MySession> & ConversationFlavor;
export type MyConversation = Conversation<MyContextConversation>;
export type MyContextHydrate = HydrateFlavor<Context>;
export type MyContext = MyContextConversation & MyContextHydrate;