import { Keyboard } from "grammy";
import { MyContext } from "../tg/myContext";

export const selectMonthBranch = async (ctx: MyContext) => {
  const timeMonth = new Keyboard()
    .text("Добавить часы за месяц")
    .row()
    .text("Посмотреть ранее введённые часы за месяц")
    .row()
    .text("< Вернуться в начало")
    .oneTime();
  await ctx.reply("Вы можете добавить или просмотреть часы😊", {
    reply_markup: timeMonth,
  });
};
