// src/bot.ts
import {Bot, Context, GrammyError, HttpError, session } from "grammy";
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { MyContext } from "./myContext";
import { selectMonth } from "./conversations/selectMonth";
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
import cron from "node-cron"
import { authenticate } from "./googleSheets/authenticate";
import { currentMonth } from "./utils/currentMonth";
import { currentYear } from "./utils/currentYear";
import { selectProjectForView } from "./projectBranch/selectProjectForView";
import { dbConnection } from "./db";

const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN || "");

dbConnection()

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

bot.callbackQuery(/viewProject_/, selectProjectForView)

bot.hears("Открыть список проектов", openProjectList)

bot.hears("Создать новый проект", async (ctx) => {
  await ctx.reply(`Введите название нового проекта:`)
  await ctx.conversation.enter(`createNewProject`)
})

bot.callbackQuery("callbackOpenProjectList", openProjectList) 

bot.callbackQuery("nextStepProject", async (ctx) => {
  const selectedProject = ctx.session.selected;
  if (selectedProject) {
      await ctx.conversation.enter("selectProject");
      await ctx.answerCallbackQuery();
  } else {
    console.log("не существует selectedProject");
  }
});

bot.callbackQuery("backToProjects", callbackBackToProject)


bot.callbackQuery("nextStepMonth", async (ctx) => {
  const selectedMonth = ctx.session.selected;
  if (selectedMonth) {
      await ctx.conversation.enter("selectMonth");
      await ctx.answerCallbackQuery();
  } else {
    console.log("не существует selectedMonth");
  }
});

bot.callbackQuery("backToMonths", callbackBackToMonth)


bot.callbackQuery(/project_/, callbackProjectList)


let months: string[] = []
months = currentMonth()
bot.callbackQuery([...months], callbackMonthList)


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

cron.schedule('0 0 1 * *', async () => {
  try {
      let months = currentMonth() 
      let month = months[2]
      let year = currentYear();
      console.log("Cron job executed");
      const doc = await authenticate(process.env.MONTHS_SHEET_ID as string);
      await doc.loadInfo();
      await doc.addSheet({ title: `${month} ${year}` });
  } catch (error) {
      console.error("Error");
  }
});

bot.on("message", handleMessage);


bot.start()
