import { Keyboard } from "grammy";
import { MyContext } from "../tg/myContext";
import { viewHoursProjectProvider } from "../providers/viewHoursProjectProvider";

export const selectProjectForView = async (ctx: MyContext) => {
  const userId = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный id";

  const callbackQuery = ctx.callbackQuery;
  let projectData = callbackQuery?.data?.substring(12);

  if (!callbackQuery || !callbackQuery.message) {
    return;
  }

  if (!projectData) {
    await ctx.reply("Пожалуйста, выберите проект.");
    return;
  }

  const userSelectProject: string = projectData;

  try {
    const hours = await viewHoursProjectProvider(userId, userSelectProject);
    console.log(`hours - ${hours}`);

    if (hours !== undefined && hours !== null) {
      await ctx.reply(`Ваши часы в проекте "${userSelectProject}": ${hours}`);
    } else {
      await ctx.reply(`Данные не найдены для пользователя с id ${userId}.`);
    }
  } catch (error) {
    console.log(`work catch`);
  }

  await ctx.answerCallbackQuery();
  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам")
    .row()
    .text("Учёт времени по проектам");

  await ctx.reply(`Хотите сделать что-то ещё?`, {
    reply_markup: choiceDirection,
  });
};
