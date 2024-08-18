// src/monthBranch/openMonthList.ts
import { Context, InlineKeyboard } from "grammy"
import { currentMonth } from "../utils/currentMonth";

let months: string[] = []

export const openMonthList = async (ctx: Context) => {
    months = currentMonth()
    const inlineKeyboard = new InlineKeyboard()
        .text(months[0], months[0])
        .text(months[1], months[1])
        .text(months[2], months[2])
    await ctx.reply("Выберите месяц из списка:", {
        reply_markup: inlineKeyboard
    });
};

export const monthCallbacks = [months[0], months[1], months[2],];