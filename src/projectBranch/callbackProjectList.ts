import { Context, InlineKeyboard } from "grammy"

export const callbackProjectList = async (ctx: Context) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }

    const inlineKeyboard = new InlineKeyboard()
        .text("Да, продолжить", "nextStepProject").row()
        .text("< Вернуться к выбору", "backToProjects");
    
    await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Вы выбрали: ${callbackQuery.data}`, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery();
};