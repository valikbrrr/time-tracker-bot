import { InlineKeyboard } from "grammy";
import { existsProject } from "../providers/existsProject";
import { MyContext } from "../tg/myContext";

export const callbackBackToProject = async (ctx: MyContext) => {
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery || !callbackQuery.message) {
    return;
  }

  let projectList: string[] | null = await existsProject();
  if (projectList === null) {
    const inlineKeyboard = new InlineKeyboard().text(
      "Создать новый проект",
      "Создать новый проект"
    );
    await ctx.reply(
      "Проекты ещё не добавлены. Вы можете создать новый проект!",
      {
        reply_markup: inlineKeyboard,
      }
    );
  } else {
    const inlineKeyboard = new InlineKeyboard();
    projectList.forEach((project, index) => {
      inlineKeyboard.text(project, `project_${project}`);
      if ((index + 1) % 3 === 0) {
        inlineKeyboard.row();
      }
    });
    await ctx.api.editMessageText(
      callbackQuery.message.chat.id,
      callbackQuery.message.message_id,
      `Выберите ваш проект `,
      {
        reply_markup: inlineKeyboard,
      }
    );
    await ctx.answerCallbackQuery();
  }
};
