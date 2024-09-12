// src/monthBranch/callbackBackToMonth
import { Context, InlineKeyboard } from "grammy"
import { currentMonth } from "../providers/currentMonth";

export const callbackBackToMonth = async (ctx: Context) => {
    
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    } 
    
    let months = currentMonth()

    const inlineKeyboard = new InlineKeyboard()
        .text(months[0], months[0])
        .text(months[1], months[1])
        .text(months[2], months[2])
      await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Выберите месяц из списка: `, {
        reply_markup: inlineKeyboard,
    });
    
    await ctx.answerCallbackQuery()
  }




//   import { Context, InlineKeyboard } from "grammy"
// import { currentMonth } from "../utils/currentMonth";
// import { monthCallbacks } from "./openMonthList";

// export const callbackBackToMonth = async (ctx: Context) => {
//     const callbackQuery = ctx.callbackQuery;

//     if (!callbackQuery || !callbackQuery.message) {
//         return; // Если нет callbackQuery или сообщения, выходим
//     }
//     const months = [...monthCallbacks]
//     const inlineKeyboard = new InlineKeyboard()
//         .text(months[0], months[0])
//         .text(months[1], months[1])
//         .text(months[2], months[2])
//     await ctx.reply("Выберите месяц из списка:", {
//         reply_markup: inlineKeyboard
//     });
//     await ctx.answerCallbackQuery()