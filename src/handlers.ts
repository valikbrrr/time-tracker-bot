import { Context } from "grammy";
import { Keyboard } from "grammy";

export const handleMessage = async (ctx: Context) => {
  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");
  await ctx.reply("Что-то пошло не так, давай заново...", {
    reply_markup: choiceDirection,
  });
};



