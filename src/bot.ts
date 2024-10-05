// src/bot.ts
import { Bot, GrammyError, HttpError, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { hydrate } from "@grammyjs/hydrate";
import { MyContext } from "./myContext";
import { selectMonth } from "./conversations/selectMonth";
import { selectProject } from "./conversations/selectProject";
import { createNewProject } from "./conversations/createNewProject";
import { accessControl } from "./middlewares/accessControl";
import { handleMessage } from "./handlers";
import { registerCommands } from "./commands/registerCommand";
import { callbackProjectList } from "./projectBranch/callbackProjectList";
import { callbackMonthList } from "./monthBranch/callbackMonthList";
import { authenticate } from "./googleSheets/authenticate";
import { currentMonth } from "./providers/currentMonth";
import { currentYear } from "./utils/currentYear";
import { selectProjectForView } from "./projectBranch/selectProjectForView";
import { dbConnection } from "./db";
import { timeTrackerMonthModel } from "./db/modelMonth";
import { selectMonthForView } from "./monthBranch/selectMonthForView";
import { addAdmin } from "./changeWhitelist/addAdmin";
import { addUser } from "./changeWhitelist/addUser";
import { removeUser } from "./changeWhitelist/removeUser";
import cron from "node-cron";
import { hearsMap } from "./botHears";
import { callbackQueryMap } from "./botCallbackQuery";
import { logger } from "./utils/logger";

// review
// (async () => {
// await  dbConnection()

// })()

// нужно ли .start или оно просто автоматически запускается?

export const webAppUrl = "https://lucent-wisp-01e9e6.netlify.app/";

(async () => {
  const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN || "");

  logger.info(`work bot.ts`);

  async () => {
    await dbConnection();
  };

  bot.use(accessControl);

  registerCommands(bot);

  bot.use((ctx, next) => {
    ctx.session = ctx.session || {};
    return next();
  });

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(hydrate());

  bot.use(createConversation(selectMonth));
  bot.use(createConversation(selectProject));
  bot.use(createConversation(createNewProject));
  bot.use(createConversation(addAdmin));
  bot.use(createConversation(addUser));
  bot.use(createConversation(removeUser));

  // review

  for (const [key, callback] of Object.entries(hearsMap)) {
    bot.hears(key, callback);
  }

  for (const [key, callback] of Object.entries(callbackQueryMap)) {
    bot.callbackQuery(key, callback);
  }

  bot.callbackQuery(/viewProject_/, selectProjectForView);

  bot.callbackQuery(/viewMonth_/, selectMonthForView);

  bot.callbackQuery(/project_/, callbackProjectList);

  let months: string[] = [];
  months = currentMonth();
  bot.callbackQuery([...months], callbackMonthList);

  bot.catch((err) => {
    const ctx = err.ctx;
    logger.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      logger.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      logger.error("Could not contact Telegram:", e);
    } else {
      logger.error("Unknown error:", e);
    }
  });

  cron.schedule("0 0 1 * *", async () => {
    try {
      let months = currentMonth();
      let month = months[2];
      let year = currentYear();
      logger.info("Cron is work");
      const doc = await authenticate(process.env.MONTH_SHEET_ID as string);
      await doc.loadInfo();
      const newSheet = await doc.addSheet({ title: `${month} ${year}` });
      logger.info(`newSheet - ${month} ${year}`);
      newSheet.setHeaderRow(["Name", "Id", "Hours"]);
      timeTrackerMonthModel.create({
        monthAndYear: `${month} ${year}`,
        data: [],
      });
    } catch (error) {
      console.error("Error");
    }
  });

  bot.on("message", handleMessage);

  bot.start();
})();
