// // src/commands/myId.ts
// import { Bot, Context } from "grammy";
// import { MyContext } from "../types";

// export default (bot: Bot<MyContext>) => {
//   bot.command("my_id", async (ctx: Context) => {
//     await ctx.reply(`Вот ваш id: ${ctx.from?.id}`);
//   });
// };

import { Context } from "grammy";

export const myIdCommand = async (ctx: Context) => {
  await ctx.reply(`Вот ваш id: ${ctx.from?.id}`);
};