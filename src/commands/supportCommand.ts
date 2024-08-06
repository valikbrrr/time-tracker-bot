// // src/commands/support.ts
// import { Bot, Context } from "grammy";
// import { MyContext } from "../types";

// export default (bot: Bot<MyContext>) => {
//   bot.command("support", async (ctx: Context) => {
//     await ctx.reply("Пока я ничем не могу вам помочь😔");
//   });
// };

import { Context } from "grammy";

export const supportCommand = async (ctx: Context) => {
  await ctx.reply(`Пока я ничем не могу вам помочь😔`);
};