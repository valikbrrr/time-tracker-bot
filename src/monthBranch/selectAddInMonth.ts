import { Context, Keyboard } from "grammy"

export const selectAddInMonth = async (ctx: Context) => {
    const inputOptionsKeyboard = new Keyboard()
      .text("Открыть список месяцев")
      // .text("Ввести интервал")
      .oneTime()
    await ctx.reply("Выберите промежуток времени", {
      reply_markup: inputOptionsKeyboard
    })
}