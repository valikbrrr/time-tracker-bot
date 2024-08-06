import { Context, Keyboard } from "grammy"

export const selectAddInProject = async (ctx: Context) => {
    const projectSelectOrCreate = new Keyboard()
      .text("Открыть список проектов").row()
      .text("Создать новый проект")
      .oneTime()
    await ctx.reply("Что вы хотите сделать?", {
      reply_markup:  projectSelectOrCreate
    })
}
  