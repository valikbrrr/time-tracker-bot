import { Context, InlineKeyboard } from "grammy";
import { webAppUrl } from "../bot";
import { currentMonth } from "../providers/currentMonth";

export const startCommand = async (ctx: Context) => {
  // console.log("startCommand work");

  const inlinekeyboard = new InlineKeyboard()
    .text("Воспользоваться ботом", "botStart").row()
    .webApp("Открыть бота в приложении", webAppUrl); 

  await ctx.reply("Здравствуйте! Как хотите взаимодействовать с ботом?", {
    reply_markup: inlinekeyboard,
  });
};
