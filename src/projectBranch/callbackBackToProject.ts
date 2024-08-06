import { Context, InlineKeyboard } from "grammy"

export const callbackBackToProject = async (ctx: Context) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }

    const inlineKeyboard = new InlineKeyboard()
      .text("*проект 1*", "project-1")
      .text("*проект 2*", "project-2")
      .text("*проект 3*", "project-3")
      .text("*проект 4*", "project-4")
      await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Выберите ваш проект `, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery()
  }

  