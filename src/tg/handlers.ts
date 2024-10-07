import { InlineKeyboard } from "grammy";
import { webAppUrl } from "./bot";
import { MyContext } from "./myContext";

export const handleMessage = async (ctx: MyContext) => {
  console.log(`Получено сообщение: ${ctx.message?.text}`);
  const inlinekeyboard = new InlineKeyboard()
    .text("Воспользоваться ботом", "botStart")
    .row()
    .webApp("Открыть бота в приложении", webAppUrl);

  await ctx.reply("Здравствуйте! Как хотите взаимодействовать с ботом?", {
    reply_markup: inlinekeyboard,
  });
};
