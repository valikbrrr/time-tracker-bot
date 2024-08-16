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