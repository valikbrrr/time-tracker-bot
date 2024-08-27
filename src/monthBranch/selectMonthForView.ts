import { Keyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";
import { currentYear } from "../utils/currentYear";

export const selectMonthForView = async (ctx: MyContext) => {
    const monthSheetId = process.env.MONTH_SHEET_ID as string;

    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";

    const callbackQuery = ctx.callbackQuery;
    let selectedMonth = callbackQuery?.data?.substring(10).trim();
    let year = currentYear();
    const sheetName = `${selectedMonth} ${year}`;

    if (!callbackQuery || !callbackQuery.message) {
        return;
    }

    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();

        const sheet = doc.sheetsByTitle[sheetName];

        if (!sheet) {
            await ctx.reply(`Лист "${sheetName}" не найден.`);
            return; // Если лист не найден, выходим
        }

        const rows = await sheet.getRows(); 
        
        const userHours = rows.filter((row) => {
            const name = row.get('Name');
            const hours = row.get('Hours');
            if (name === userName) {
                console.log(`Ваши часы за месяц ${selectedMonth}: ${hours}`);
                ctx.reply(`Ваши часы за месяц ${selectedMonth}: ${hours}`);
                return hours; // Возвращаем часы для пользователя
            } 
            return null;
        });

        if (!(userHours.length > 0)) {
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

    await ctx.reply(`Хотите сделать что-то ещё?`, {
        reply_markup: choiceDirection
    });

}