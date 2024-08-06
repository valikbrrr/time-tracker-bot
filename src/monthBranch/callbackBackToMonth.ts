import { Context, InlineKeyboard } from "grammy"

export const callbackBackToMonth = async (ctx: Context) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }
    const inlineKeyboard = new InlineKeyboard()
      .text("январь", "январь")
      .text("февраль", "февраль")
      .text("март", "март")
      .text("апрель", "апрель").row()
      .text("май", "май")
      .text("июнь", "июнь")
      .text("июль", "июль")
      .text("август", "август").row()
      .text("сентябрь", "сентябрь")
      .text("октябрь", "октябрь")
      .text("ноябрь", "ноябрь")
      .text("декабрь", "декабрь")
      await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Выберите месяц из списка: `, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery()
  }