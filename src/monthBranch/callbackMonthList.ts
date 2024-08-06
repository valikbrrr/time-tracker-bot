import { Context, InlineKeyboard } from "grammy"

export const callbackMonthList = async (ctx: Context) => {
        const callbackQuery = ctx.callbackQuery;
    
        if (!callbackQuery || !callbackQuery.message) {
            return; // Если нет callbackQuery или сообщения, выходим
        }
    const inlineKeyboard = new InlineKeyboard()
      .text("Да, продолжить", "nextStepMonth").row()
      .text("< Вернуться к выбору месяца", "backToMonths")
      await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Вы выбрали месяц: ${callbackQuery.data}`, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery()
  }
  