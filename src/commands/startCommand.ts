import { InlineKeyboard } from "grammy";
import { webAppUrl } from "../tg/bot";
import { MyContext } from "../tg/myContext";

export const startCommand = async (ctx: MyContext) => {
  const inlinekeyboard = new InlineKeyboard()
    .text("Воспользоваться ботом", "botStart")
    .row()
    .webApp("Открыть бота в приложении", webAppUrl);

  await ctx.reply("Здравствуйте! Как хотите взаимодействовать с ботом?", {
    reply_markup: inlinekeyboard,
  });
};
