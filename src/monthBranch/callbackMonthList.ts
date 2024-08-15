// src/monthBranch/callbackMonthList.ts
import { Context, InlineKeyboard } from "grammy";
import { MyContext } from "../myContext";

export const callbackMonthList = async (ctx: MyContext) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }

    const selectedMonth = callbackQuery.data; // Сохраняем выбранный месяц
    ctx.session.selectedMonth = selectedMonth; // Сохраняем в сессии

    const inlineKeyboard = new InlineKeyboard()
        .text("Да, продолжить", "nextStepMonth").row()
        .text("< Вернуться к выбору месяца", "backToMonths");

    await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Вы выбрали месяц: ${selectedMonth}`, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery();
};