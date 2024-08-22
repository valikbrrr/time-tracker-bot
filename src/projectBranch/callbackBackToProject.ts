import { Context, InlineKeyboard } from "grammy"
import { existsProject } from "../utils/existsProject";

export const callbackBackToProject = async (ctx: Context) => {
    const callbackQuery = ctx.callbackQuery;

    if (!callbackQuery || !callbackQuery.message) {
        return; // Если нет callbackQuery или сообщения, выходим
    }

    let projectList:string[] = []
    projectList = await existsProject(); 
    const inlineKeyboard = new InlineKeyboard()
    // console.log("fffffffff");
    
  
      projectList.forEach((project, index) => {
        inlineKeyboard.text(project, `project_${project}`)
        if ((index + 1) % 3 === 0) {
          inlineKeyboard.row()
        }
      })
      await ctx.api.editMessageText(callbackQuery.message.chat.id, callbackQuery.message.message_id, `Выберите ваш проект `, {
        reply_markup: inlineKeyboard,
    });
    await ctx.answerCallbackQuery()
  }

  