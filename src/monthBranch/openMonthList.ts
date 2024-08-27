// src/monthBranch/openMonthList.ts
import { Context, InlineKeyboard } from "grammy"
import { currentMonth } from "../utils/currentMonth";


export const openMonthList = async (ctx: Context) => {
    let months: string[] = []
    months = currentMonth()
    const inlineKeyboard = new InlineKeyboard()
        .text(months[0], months[0])
        .text(months[1], months[1])
        .text(months[2], months[2])
    await ctx.reply("Выберите месяц из списка:", {
        reply_markup: inlineKeyboard
    });
    return months
};

