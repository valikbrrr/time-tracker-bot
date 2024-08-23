import { Context, InlineKeyboard} from "grammy"
import { existsProject } from "../utils/existsProject";

export const viewHoursProject = async (ctx: Context) => {
  let projectList:string[] = []
  projectList = await existsProject(); 
  const inlineKeyboard = new InlineKeyboard()

    projectList.forEach((project, index) => {
      inlineKeyboard.text(project, `viewProject_${project}`)
      if ((index + 1) % 3 === 0) {
        inlineKeyboard.row()
      }
    })
  await ctx.reply("Выберите проект для просмотра часов", {
    reply_markup: inlineKeyboard
  })
}