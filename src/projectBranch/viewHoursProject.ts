import { InlineKeyboard} from "grammy"
import { existsProject } from "../providers/existsProject";
import { MyContext } from "../myContext";

export const viewHoursProject = async (ctx: MyContext) => {
  let projectList:string[] | null = await existsProject(); 
  if (projectList === null) {
    const inlineKeyboard = new InlineKeyboard()
    .text('Создать новый проект')
    await ctx.reply("Проекты ещё не добавлены. Вы можете создать новый проект!", {
      reply_markup: inlineKeyboard
    })
  } else {
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
}