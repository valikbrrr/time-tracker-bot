import { authenticate } from "../googleSheets/authenticate";
import { MyContext } from "../myContext";
import { searchUser } from "../utils/searchUser";

export const selectProjectForView = async (ctx: MyContext) => {
    const projectSheetId = process.env.PROJECT_SHEET_ID as string;

    // authenticate(projectSheetId)

    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь"



    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }
    
    searchUser(userName, projectSheetId)
    
    await ctx.reply(`Ваши часы ${""}`)
    await ctx.answerCallbackQuery();
}