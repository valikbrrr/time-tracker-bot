import { Keyboard } from "grammy";
import { MyContext } from "./myContext";

export const botStart = async (ctx: MyContext) => {
  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам")
    .row()
    .text("Учёт времени по проектам");
  await ctx.reply("Выберите формат ввода времени", {
    reply_markup: choiceDirection,
  });
  await ctx.answerCallbackQuery();
};
