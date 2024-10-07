import { InlineKeyboard } from "grammy";
import { currentMonth } from "../providers/currentMonth";
import { MyContext } from "../tg/myContext";

export const viewHoursMonth = async (ctx: MyContext) => {
  let months: string[] = [];
  months = currentMonth();
  const inlineKeyboard = new InlineKeyboard()
    .text(months[0], `viewMonth_${months[0]}`)
    .text(months[1], `viewMonth_${months[1]}`)
    .text(months[2], `viewMonth_${months[2]}`);
  await ctx.reply("Выберите месяц для просмотра часов", {
    reply_markup: inlineKeyboard,
  });
};
