import { sheets } from "googleapis/build/src/apis/sheets";
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
            rows.filter((row) => {
            const name = row.get('Name');
            const hours = row.get('Hours');
            if (name === userName) {
                let newHours = hours
                console.log(`Ваши часы ${newHours}`);
                ctx.reply(`Ваши часы ${newHours}`);
            }
        })
    }
    await ctx.answerCallbackQuery();
}
