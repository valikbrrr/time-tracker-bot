import { Keyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";
// import { viewProject } from "../providers/viewProject";

export const selectProjectForView = async (ctx: MyContext) => {
    const projectSheetId = process.env.PROJECT_SHEET_ID as string;

    const userId = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный id";

    const callbackQuery = ctx.callbackQuery;
    let selectedProject = callbackQuery?.data?.substring(12);

    if (!callbackQuery || !callbackQuery.message) {
        return; 
    }

    const doc = await authenticate(projectSheetId);
    await doc.loadInfo();
    if (selectedProject) {
        const sheet = doc.sheetsByTitle[selectedProject];
        const rows = await sheet.getRows(); 
        const userHours = rows.filter((row) => {
            const id = row.get('Id');
            const hours = row.get('Hours');
            return id === userId ? hours : null; 
        });

        if (userHours.length > 0) {
            const newHours = userHours.map((row: any) => row.get('Hours')).join(", ");
            await ctx.reply(`Ваши часы в проекте "${selectedProject}": ${newHours}`);
        } else {
            await ctx.reply(`Данные не найдены для пользователя с id ${userId}.`);
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