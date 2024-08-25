import { Keyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";

export const selectProjectForView = async (ctx: MyContext) => {
    const projectSheetId = process.env.PROJECT_SHEET_ID as string;

    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";

    const callbackQuery = ctx.callbackQuery;
    let selectedProject = callbackQuery?.data?.substring(12);

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }

    const doc = await authenticate(projectSheetId);
    await doc.loadInfo();
    if (selectedProject) {
        const sheet = doc.sheetsByTitle[selectedProject];
        const rows = await sheet.getRows(); // Получаем строки из листа

        // Извлечение данных
        const userHours = rows.filter((row) => {
            const name = row.get('Name');
            const hours = row.get('Hours');
            return name === userName ? hours : null; // Возвращаем часы, если имя совпадает
        });

        if (userHours.length > 0) {
            const newHours = userHours.map(row => row.get('Hours')).join(", ");
            console.log(`Ваши часы в проекте "${selectedProject}": ${newHours}`);
            await ctx.reply(`Ваши часы в проекте "${selectedProject}": ${newHours}`);
        } else {
            await ctx.reply(`Данные не найдены для пользователя ${userName}.`);
        }
    }
    await ctx.answerCallbackQuery();
    const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");

    await ctx.reply(`Хотите сделать что-то ещё?`, {
        reply_markup: choiceDirection
    });
};