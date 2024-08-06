// // src/conversations/index.ts
// import { Bot } from "grammy";
// import { MyContext } from "../types";
// import selectMonth from "./selectMonth";
// import inputInterval from "./inputInterval";
// import selectProject from "./selectProject";
// import createNewProject from "./createNewProject";

// export default (bot: Bot<MyContext>) => {
//   bot.command('select_month', selectMonth); // Передаем только функцию
//   bot.command('input_interval', inputInterval);
//   bot.command('select_project', selectProject);
//   bot.command('create_new_project', createNewProject);
// };

import { createConversation } from "@grammyjs/conversations";
import { selectMonth } from "./selectMonth";
import { inputInterval } from "./inputInterval";
import { selectProject } from "./selectProject";
import { createNewProject } from "./createNewProject";

export const conversationMiddleware = [
    createConversation(selectMonth),
    createConversation(inputInterval),
    createConversation(selectProject),
    createConversation(createNewProject),
];