// src/projectBranch/openProjectList
import { Context, InlineKeyboard } from "grammy";
import { existsProject } from "../utils/existsProject";


export const openProjectList = async (ctx: Context) => {
  let projectList:string[] = []
  projectList = await existsProject(); 
  const inlineKeyboard = new InlineKeyboard()

    projectList.forEach((project, index) => {
      inlineKeyboard.text(project, `project_${project}`)
      if ((index + 1) % 3 === 0) {
        inlineKeyboard.row()
      }
    })
  await ctx.reply("Выберите ваш проект", {
    reply_markup: inlineKeyboard
  })
  await ctx.answerCallbackQuery();// ????
}

