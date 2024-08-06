import { Keyboard } from "grammy"
import { Context } from "grammy"

export const selectProjectBranch = async (ctx: Context) => {
    const timeProject = new Keyboard()
      .text("Добавить часы за проект").row()
      .text("Посмотреть ранее введённые часы в проектах")
    await ctx.reply("Вы можете добавить часы😊", {
      reply_markup:  timeProject
    })
}