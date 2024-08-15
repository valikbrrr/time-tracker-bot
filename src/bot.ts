// src/bot.ts
import {Bot, GrammyError, HttpError, session } from "grammy";
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { MyContext } from "./myContext";
import { selectMonth } from "./conversations/selectMonth";
// import { inputInterval } from "./conversations/inputInterval";
import { selectProject } from "./conversations/selectProject";
import { createNewProject } from "./conversations/createNewProject";
import { accessControl } from "./middlewares/index";
import { handleMessage } from "./handlers";
import { registerCommands } from "./commands/index";
import { selectMonthBranch } from "./monthBranch/selectMonthBranch";
import { selectProjectBranch } from "./projectBranch/selectProjectBranch";
import { viewHoursMonth } from "./monthBranch/viewHoursMonth";
import { selectAddInProject } from "./projectBranch/selectAddInProject";
import { viewHoursProject } from "./projectBranch/viewHoursProject";
import { openProjectList } from "./projectBranch/openProjectList";
import { callbackProjectList } from "./projectBranch/callbackProjectList";
import { callbackBackToProject } from "./projectBranch/callbackBackToProject";
import { callbackMonthList } from "./monthBranch/callbackMonthList";
import { callbackBackToMonth } from "./monthBranch/callbackBackToMonth";
import { openMonthList } from "./monthBranch/openMonthList";

type MySession = {
  selectedMonth?: string;
};

const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN || "");

bot.use(accessControl);
registerCommands(bot);

bot.use((ctx, next) => {
  ctx.session = ctx.session || {};
  return next();
});

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(hydrate())


// bot.use(createConversation(inputInterval));
bot.use(createConversation(selectMonth));
bot.use(createConversation(selectProject));
bot.use(createConversation(createNewProject));


bot.hears("Учёт времени по месяцам", selectMonthBranch)

bot.hears("Учёт времени по проектам", selectProjectBranch)

bot.hears("Добавить часы за месяц", openMonthList)

bot.hears("Посмотреть ранее введённые часы за месяц", viewHoursMonth)

bot.hears("Добавить часы за проект", selectAddInProject)

bot.hears("Посмотреть ранее введённые часы в проектах", viewHoursProject)

bot.hears("Открыть список проектов", openProjectList)

bot.hears("Создать новый проект", async (ctx) => {
  await ctx.reply(`Введите название нового проекта:`)
  await ctx.conversation.enter(`createNewProject`)
})

bot.callbackQuery(["project-1", "project-2", "project-3", "project-4"], callbackProjectList);

bot.callbackQuery("nextStepProject", async (ctx) => {
  await ctx.conversation.enter("selectProject");
  await ctx.answerCallbackQuery()
})

bot.callbackQuery("backToProjects", callbackBackToProject)

bot.callbackQuery([ "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ], callbackMonthList)

bot.callbackQuery("nextStepMonth", async (ctx) => {
  await ctx.conversation.enter("selectMonth");
  await ctx.answerCallbackQuery()
})

bot.callbackQuery("backToMonths", callbackBackToMonth)

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.on("message", handleMessage);

bot.start()
