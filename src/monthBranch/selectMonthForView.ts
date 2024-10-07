import { Keyboard } from "grammy";
import { MyContext } from "../tg/myContext";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";

export const selectMonthForView = async (ctx: MyContext) => {
  const userId = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный id";

  const callbackQuery = ctx.callbackQuery;
  const monthData = callbackQuery?.data?.substring(10).trim();

  if (!callbackQuery || !callbackQuery.message) {
    return;
  }

  if (!monthData) {
    await ctx.reply("Пожалуйста, выберите месяц.");
    return;
  }

  const userSelectMonth: string = monthData;

  try {
    const hours = await viewHoursMonthProvider(userId, userSelectMonth);
    console.log(`hours - ${hours}`);

    if (hours !== undefined && hours !== null) {
      await ctx.reply(`Ваши часы за месяц ${userSelectMonth}: ${hours}`);
    } else {
      await ctx.reply(`Данные не найдены для пользователя с id - ${userId}.`);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    await ctx.reply(
      "Произошла ошибка при получении данных. Пожалуйста, попробуйте позже."
    );
  }

  await ctx.answerCallbackQuery();

  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам")
    .row()
    .text("Учёт времени по проектам");

  await ctx.reply("Хотите сделать что-то ещё?", {
    reply_markup: choiceDirection,
  });
};
