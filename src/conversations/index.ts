import { createConversation } from "@grammyjs/conversations";
import { selectMonth } from "./selectMonth";
import { selectProject } from "./selectProject";
import { createNewProject } from "./createNewProject";
import { addAdmin } from "../changeWhitelist/addAdmin";
import { addUser } from "../changeWhitelist/addUser";
import { removeUser } from "../changeWhitelist/removeUser";

export const conversationMiddleware = [
    createConversation(selectMonth),
    createConversation(selectProject),
    createConversation(createNewProject),
    createConversation(addAdmin),
    createConversation(addUser),
    createConversation(removeUser),
];