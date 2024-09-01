import { Context, InlineKeyboard } from "grammy";
import { webAppUrl } from "../bot";

export const startCommand = async (ctx: Context) => {
  console.log("startCommand work");

  const inlinekeyboard = new InlineKeyboard()
    .text("Воспользоваться ботом", "botStart").row()
    .webApp("Открыть бота в приложении", webAppUrl); // Используйте webApp

  await ctx.reply("Здравствуйте! Как хотите взаимодействовать с ботом?", {
    reply_markup: inlinekeyboard,
  });
};
