import { Context, Keyboard } from "grammy";
import { MyContext } from "../myContext";

export const changeWhitelist = async (ctx: MyContext) => {
  console.log(ctx.isAdmin);
  if (ctx.isAdmin) {  // Используем ctx.isAdmin
    const selectChanges = new Keyboard()
      .text("Добавить администратора").row()
      .text("Добавить пользователя").row()
      .text("Удалить пользователя")
      .oneTime()
    await ctx.reply(`Что бы вы хотели изменить?`, {
      reply_markup: selectChanges
    });
  } else {
    const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");
    ctx.reply("Эта команда доступна только администраторам!", {
      reply_markup: choiceDirection
    })
  }
};