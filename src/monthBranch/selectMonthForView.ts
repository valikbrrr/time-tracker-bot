import { Keyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";
import { currentYear } from "../utils/currentYear";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";

export const selectMonthForView = async (ctx: MyContext) => {
    const monthSheetId = process.env.MONTH_SHEET_ID as string;

    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";

    const callbackQuery = ctx.callbackQuery;
    const monthData = callbackQuery?.data?.substring(10).trim();

    // Проверяем, что monthData определено и является строкой
    if (!monthData) {
        await ctx.reply("Пожалуйста, выберите месяц.");
        return;
    }

    const userSelectMonth: string = monthData; // Присваиваем значение, зная, что оно не undefined

    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();

        const { userHours, hours } = await viewHoursMonthProvider(userName, userSelectMonth);

        if (userHours.length > 0) {
            await ctx.reply(`Ваши часы за месяц ${userSelectMonth}: ${hours}`);
        } else {
            await ctx.reply(`Данные не найдены для пользователя ${userName}.`);
        }
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        await ctx.reply("Произошла ошибка при получении данных. Пожалуйста, попробуйте позже.");
    }
    
    await ctx.answerCallbackQuery();
    
    const choiceDirection = new Keyboard()
        .text("Учёт времени по месяцам").row()
        .text("Учёт времени по проектам");

    await ctx.reply("Хотите сделать что-то ещё?", {
        reply_markup: choiceDirection
    });
}