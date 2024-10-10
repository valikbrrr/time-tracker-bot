import { InlineKeyboard } from "grammy";
import { MyContext } from "../tg/myContext";

export const callbackProjectList = async (ctx: MyContext) => {
  const callbackQuery = ctx.callbackQuery;

  if (!callbackQuery || !callbackQuery.message) {
    return; // Если нет callbackQuery или сообщения, выходим
  }

  let selectedProject = callbackQuery.data;
  ctx.session.selected = selectedProject;

  const inlineKeyboard = new InlineKeyboard()
    .text("Да, продолжить", "nextStepProject")
    .row()
    .text("< Вернуться к выбору", "backToProjects");

  await ctx.api.editMessageText(
    callbackQuery.message.chat.id,
    callbackQuery.message.message_id,
    `Вы выбрали: ${ctx.callbackQuery?.data?.substring(8)}`,
    {
      reply_markup: inlineKeyboard,
    }
  );

  await ctx.answerCallbackQuery();
};
