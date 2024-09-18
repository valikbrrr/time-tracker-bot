import { Context, InlineKeyboard } from "grammy";
import { webAppUrl } from "../bot";

export const startCommand = async (ctx: Context) => {
  const inlinekeyboard = new InlineKeyboard()
    .text("Воспользоваться ботом", "botStart").row()
    .webApp("Открыть бота в приложении", webAppUrl); 

  await ctx.reply("Здравствуйте! Как хотите взаимодействовать с ботом?", {
    reply_markup: inlinekeyboard,
  });
};
