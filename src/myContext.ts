import {Context} from "grammy";

import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";

import {HydrateFlavor} from "@grammyjs/hydrate";

type MyContextConversation = Context & ConversationFlavor;
type MyConversation = Conversation<MyContextConversation>;

type MyContextHydrate = HydrateFlavor<Context>;

export type MyContext = MyContextConversation & MyContextHydrate;