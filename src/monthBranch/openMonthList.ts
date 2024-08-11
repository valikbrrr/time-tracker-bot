import { Context, InlineKeyboard, Keyboard } from "grammy"

export const openMonthList = async (ctx: Context) => {
  const inlineKeyboard = new InlineKeyboard()
  .text("январь", "январь")
  .text("февраль", "февраль")
  .text("март", "март")
  .text("апрель", "апрель").row()
  .text("май", "май")
  .text("июнь", "июнь")
  .text("июль", "июль")
  .text("август", "август").row()
  .text("сентябрь", "сентябрь")
  .text("октябрь", "октябрь")
  .text("ноябрь", "ноябрь")
  .text("декабрь", "декабрь")
await ctx.reply("Выберите месяц из списка:", {
  reply_markup: inlineKeyboard
})
}