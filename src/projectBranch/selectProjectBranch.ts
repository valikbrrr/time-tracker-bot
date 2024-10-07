import { Keyboard } from "grammy";
import { MyContext } from "../tg/myContext";

// review
export const selectProjectBranch = async (ctx: MyContext) => {
  const timeProject = new Keyboard()
    .text("Добавить часы за проект")
    .row()
    .text("Посмотреть ранее введённые часы в проектах")
    .row()
    .text("< Вернуться в начало")
    .oneTime();
  await ctx.reply("Вы можете добавить часы😊", {
    reply_markup: timeProject,
  });
};
