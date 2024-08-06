// // src/commands/start.ts
// import { Bot, Context, Keyboard } from "grammy";
// import { MyContext } from "../types";

// export default (bot: Bot<MyContext>) => {
//   bot.command("start", async (ctx: Context) => {
//     const choiceDirection = new Keyboard()
//       .text("Учёт времени по месяцам").row()
//       .text("Учёт времени по проектам");
//     await ctx.reply("Выберите формат ввода времени", {
//       reply_markup: choiceDirection,
//     });
//   });
// };

import { Context } from "grammy";
import { Keyboard } from "grammy";

export const startCommand = async (ctx: Context) => {
  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");
  
  await ctx.reply("Выберите формат ввода времени", {
    reply_markup: choiceDirection,
  });
};