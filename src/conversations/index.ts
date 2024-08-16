import { createConversation } from "@grammyjs/conversations";
import { selectMonth } from "./selectMonth";
import { selectProject } from "./selectProject";
import { createNewProject } from "./createNewProject";

export const conversationMiddleware = [
    createConversation(selectMonth),
    createConversation(selectProject),
    createConversation(createNewProject),
];