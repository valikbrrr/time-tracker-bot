import { Keyboard, Context } from "grammy"

export const selectMonthBranch = async (ctx: Context) => {
    const timeMonth = new Keyboard()
      .text("Добавить часы за месяц").row()
      .text("Посмотреть ранее введённые часы за месяц")
      .oneTime()
    await ctx.reply("Вы можете добавить часы😊", {
      reply_markup:  timeMonth
    })
}