import { Context, InlineKeyboard } from "grammy"

export const openProjectList = async (ctx: Context) => {
    const inlineKeyboard = new InlineKeyboard()
      .text("*проект 1*", "project-1")
      .text("*проект 2*", "project-2")
      .text("*проект 3*", "project-3")
      .text("*проект 4*", "project-4")
    await ctx.reply("Выберите ваш проект", {
      reply_markup:  inlineKeyboard
    })
}