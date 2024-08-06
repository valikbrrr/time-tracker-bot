import { Context, Keyboard } from "grammy"

export const viewHoursMonth = async (ctx: Context) => {
    const inputHistoryMonth = new Keyboard()
      .text("Ещё думаем над этим...🤔")
      .oneTime()
    await ctx.reply("Тут мы ещё не решили", {
      reply_markup:  inputHistoryMonth
    })
}