// src/monthBranch/callbackBackToMonth
import { InlineKeyboard } from "grammy";
import { currentMonth } from "../providers/currentMonth";
import { MyContext } from "../tg/myContext";

export const callbackBackToMonth = async (ctx: MyContext) => {
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery || !callbackQuery.message) {
    return; // Если нет callbackQuery или сообщения, выходим
  }

  let months = currentMonth();

  const inlineKeyboard = new InlineKeyboard()
    .text(months[0], months[0])
    .text(months[1], months[1])
    .text(months[2], months[2]);
  await ctx.api.editMessageText(
    callbackQuery.message.chat.id,
    callbackQuery.message.message_id,
    `Выберите месяц из списка: `,
    {
      reply_markup: inlineKeyboard,
    }
  );

  await ctx.answerCallbackQuery();
};
