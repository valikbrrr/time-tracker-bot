// src/myContext.ts
import {Context} from "grammy";

import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";

import {HydrateFlavor} from "@grammyjs/hydrate";

export type MyContextConversation = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContextConversation>;

export type MyContextHydrate = HydrateFlavor<Context>;

export type MyContext = MyContextConversation & MyContextHydrate;