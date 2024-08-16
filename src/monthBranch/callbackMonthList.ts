// src/monthBranch/callbackMonthList.ts
import { InlineKeyboard } from "grammy";
import { MyContext } from "../myContext";

export const callbackMonthList = async (ctx: MyContext) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        // console.log("true");
        return; // Если нет callbackQuery или сообщения, выходим
    } 
    // else {
    //     console.log("прошло");
    // }

    const selectedMonth = callbackQuery.data; // Сохраняем выбранный месяц
    // console.log(selectedMonth);
    ctx.session.selectedMonth = selectedMonth; // Сохраняем в сессии

    const inlineKeyboard = new InlineKeyboard()
        .text("Да, продолжить", "nextStepMonth").row()
        .text("< Вернуться к выбору месяца", "backToMonths");
    await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Вы выбрали месяц: ${selectedMonth}`, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery();
};