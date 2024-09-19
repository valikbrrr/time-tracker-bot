import { Keyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";
import { viewHoursProjectProvider } from "../providers/viewHoursProjectProvider";

export const selectProjectForView = async (ctx: MyContext) => {
    const projectSheetId = process.env.PROJECT_SHEET_ID as string;

    const userId = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный id";

    const callbackQuery = ctx.callbackQuery;
    let projectData = callbackQuery?.data?.substring(12);

    if (!callbackQuery || !callbackQuery.message) {
        return; 
    }

    if (!projectData) {
        await ctx.reply("Пожалуйста, выберите проект.");
        return; 
    }
    // if (selectedProject) {
        //     const sheet = doc.sheetsByTitle[selectedProject];
        //     const rows = await sheet.getRows(); 

    const userSelectProject: string = projectData
    

    try {
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        console.log(`userSelectProject - ${userSelectProject}`);
        console.log(`userId - ${userId}`);
        const {userHours, hours} = await viewHoursProjectProvider(userId, userSelectProject);
        console.log(`userHours - ${userHours}`);
        console.log(`hours - ${hours}`);
        
        if (userHours.length > 0) {
            console.log(`work if`);
            // const newHours = userHours.map((row: any) => row.get('Hours')).join(", ");
            await ctx.reply(`Ваши часы в проекте "${userSelectProject}": ${hours}`);
        } else {
            console.log(`work else`);
            await ctx.reply(`Данные не найдены для пользователя с id ${userId}.`);
        }
    } catch (error) {
        console.log(`work catch`);
    }
    
    await ctx.answerCallbackQuery();
    const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");

    await ctx.reply(`Хотите сделать что-то ещё?`, {
        reply_markup: choiceDirection
    });
};