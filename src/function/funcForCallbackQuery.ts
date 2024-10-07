import { MyContext } from "../tg/myContext";

export const createNewProjectCallback = async (ctx: MyContext) => {
  await ctx.reply(`Введите название нового проекта:`);
  await ctx.conversation.enter(`createNewProject`);
  await ctx.answerCallbackQuery();
};

export const nextStepProjectFunc = async (ctx: MyContext) => {
  const selectedProject = ctx.session.selected;
  if (selectedProject) {
    await ctx.conversation.enter("selectProject");
    await ctx.answerCallbackQuery();
  } else {
    console.log("не существует selectedProject");
  }
};

export const nextStepMonthFunc = async (ctx: MyContext) => {
  const selectedMonth = ctx.session.selected;
  if (selectedMonth) {
    await ctx.conversation.enter("selectMonth");
    await ctx.answerCallbackQuery();
  } else {
    console.log("не существует selectedMonth");
  }
};
