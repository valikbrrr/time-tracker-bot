// // // src/commands/index.ts
// // import { Bot } from "grammy";
// // import start from "./start";
// // import myId from "./myId";
// // import support from "./support";
// // import { MyContext } from "../types";

// // export default (bot: Bot<MyContext>) => {
// //   start(bot);
// //   myId(bot);
// //   support(bot);
// // };

// import { Api, Bot, Context, GrammyError, HttpError, InlineKeyboard, Keyboard, session } from "grammy";
// import {
//     type Conversation,
//     type ConversationFlavor,
//     conversations,
//     createConversation,
// } from "@grammyjs/conversations";
// import { hydrate, HydrateFlavor} from "@grammyjs/hydrate";

// type MyContextConversation = Context & ConversationFlavor;
// type MyConversation = Conversation<MyContextConversation>;

// type MyContextHydrate = HydrateFlavor<Context>;

// const bot = new Bot<MyContextConversation & MyContextHydrate >(process.env.TELEGRAM_TOKEN || "");


// bot.api.setMyCommands([
//   {
//     command: "start",
//     description: "Запуск бота"
//   },
//   {
//     command: "my_id",
//     description: "Узнать свой id"
//   },
//   {
//     command: "support",
//     description: "Помощь"
//   },
// ])

// // regex
// // отделение 1 от 2 

// async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
//     await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");
//     const hoursInMonth = await conversation.wait();
//     await ctx.reply(`Это всё, спасибо!`);
// }

// async function inputInterval(conversation: MyConversation, ctx: MyContextConversation) {
//   const interval = await conversation.wait();
//   await ctx.reply("Какое кол-во часов вы работали за этот интервал времени?⏰");
//   const hoursInInterval = await conversation.wait();
//   await ctx.reply(`Это всё, спасибо!`);
// }

// async function selectProject(conversation: MyConversation, ctx: MyContextConversation) {
//   await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");
//   const hoursOfProject = await conversation.wait();
//   await ctx.reply(`Это всё, спасибо!`);
// }

// async function createNewProject(conversation: MyConversation, ctx: MyContextConversation) {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("Сохранить название и продолжить", "nextStepCreate").row()
//     .text("Изменить название", "BackToCreateProject")
//   const nameOfNewProject = await conversation.wait();
//   await ctx.reply(`Поздравляю! Вы создали новый проект под названием: "${nameOfNewProject.message?.text}" 🥳`, {
//     reply_markup: inlineKeyboard
//   });
//   const callbackQuery = await conversation.waitForCallbackQuery(["nextStepCreate", "BackToCreateProject"]);
//   if (callbackQuery.callbackQuery.data === "nextStepCreate") {
//     await callbackQuery.answerCallbackQuery()
//     await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");
//     const hoursOfProject = await conversation.wait();
//     await ctx.reply(`Это всё, спасибо!`);
//   } else if (callbackQuery.callbackQuery.data === "BackToCreateProject") {
//     await callbackQuery.answerCallbackQuery()
//     await ctx.reply(`Введите название нового проекта:`);
//     await createNewProject(conversation, ctx);
//   }
// }


// bot.use(session({ initial: () => ({}) }));
// bot.use(conversations());
// bot.use(hydrate())

// bot.use(createConversation(selectMonth));
// bot.use(createConversation(inputInterval));
// bot.use(createConversation(selectProject));
// bot.use(createConversation(createNewProject));

// const whitelist = [1958491438, 882091398, 837291475];

// bot.use((ctx: Context, next) => {
//   const userId = ctx.from?.id;
//   if (userId && whitelist.includes(userId)) {
//     return next(); 
//   } else {
//     return ctx.reply("Вам доступ ограничен");
//   }
// });

// bot.command("start", async (ctx) => {
//   const choiceDirection = new Keyboard()
//     .text("Учёт времени по месяцам").row()
//     .text("Учёт времени по проектам")
//   await ctx.reply("Выберите формат ввода времени", {
//   reply_markup:  choiceDirection
//   })
// })

// bot.command("my_id", async (ctx) => {
//   await ctx.reply(`Вот ваш id: ${ctx.from?.id}`)
// })

// bot.command("support", async (ctx) => {
//   await ctx.reply(`Пока я ничем не могу вам помочь😔`)
// })

// bot.hears("Учёт времени по месяцам", async (ctx) => {
//   const timeMonth = new Keyboard()
//     .text("Добавить часы (id = месяц)").row()
//     .text("Посмотреть ранее введённые часы (id = месяц)")
//   await ctx.reply("Выберите способ ввода", {
//     reply_markup:  timeMonth
//   })
// })

// bot.hears("Учёт времени по проектам", async (ctx) => {
//   const timeProject = new Keyboard()
//     .text("Добавить часы (id = проект)").row()
//     .text("Посмотреть ранее введённые часы (id = проект)")
//   await ctx.reply("Выберите способ ввода", {
//     reply_markup:  timeProject
//   })
// })

// bot.hears("Добавить часы (id = месяц)", async (ctx) => {
//   const inputOptionsKeyboard = new Keyboard()
//     .text("Выбор месяца").row()
//     .text("Ввести интервал")
//     .oneTime()
//   await ctx.reply("Выберите промежуток времени", {
//     reply_markup: inputOptionsKeyboard
//   })
// })

// bot.hears("Выбор месяца", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("январь", "январь")
//     .text("февраль", "февраль")
//     .text("март", "март")
//     .text("апрель", "апрель").row()
//     .text("май", "май")
//     .text("июнь", "июнь")
//     .text("июль", "июль")
//     .text("август", "август").row()
//     .text("сентябрь", "сентябрь")
//     .text("октябрь", "октябрь")
//     .text("ноябрь", "ноябрь")
//     .text("декабрь", "декабрь")
//   await ctx.reply("Выберите месяц из списка:", {
//     reply_markup: inlineKeyboard
//   })
// })

// bot.hears("Ввести интервал", async (ctx) => {
//   await ctx.reply(`Введите ваш интервал😊`)
//   await ctx.conversation.enter(`inputInterval`)
// })

// bot.hears("Посмотреть ранее введённые часы (id = месяц)", async (ctx) => {
// const inputHistoryMonth = new Keyboard()
//   .text("Ещё думаем над этим...🤔")
//   .oneTime()
// await ctx.reply("Тут мы ещё не решили", {
//   reply_markup:  inputHistoryMonth
// })
// })

// bot.hears("Добавить часы (id = проект)", async (ctx) => {
//   const projectSelectOrCreate = new Keyboard()
//     .text("Открыть список проектов").row()
//     .text("Создать новый проект")
//     .oneTime()
//   await ctx.reply("Выберите то, что вам подходит🙃", {
//     reply_markup:  projectSelectOrCreate
//   })
// })

// bot.hears("Посмотреть ранее введённые часы (id = проект)", async (ctx) => {
//   const inputHistoryMonth = new Keyboard()
//     .text("Ещё думаем над этим...🤔")
//     .oneTime()
//   await ctx.reply("Тут мы ещё не решили", {
//     reply_markup:  inputHistoryMonth
//   })
// })

// bot.hears("Открыть список проектов", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("*проект 1*", "project-1")
//     .text("*проект 2*", "project-2")
//     .text("*проект 3*", "project-3")
//     .text("*проект 4*", "project-4")
//   await ctx.reply("Выберите ваш проект", {
//     reply_markup:  inlineKeyboard
//   })
// })

// bot.hears("Создать новый проект", async (ctx) => {
//   await ctx.reply(`Введите название нового проекта:`)
//   await ctx.conversation.enter(`createNewProject`)
// })

// bot.callbackQuery(["project-1", "project-2", "project-3", "project-4"], async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("Да, продолжить", "nextStepProject",).row()
//     .text("< Вернуться к выбору", "backToProjects")
//   await ctx.callbackQuery.message?.editText(`Вы выбрали: ${ctx.callbackQuery.data}`, {
//     reply_markup: inlineKeyboard
//   })
//   await ctx.answerCallbackQuery()
// })

// bot.callbackQuery("nextStepProject", async (ctx) => {
//   await ctx.conversation.enter("selectProject");
//   await ctx.answerCallbackQuery()
// })

// bot.callbackQuery("backToProjects", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("*проект 1*", "project-1")
//     .text("*проект 2*", "project-2")
//     .text("*проект 3*", "project-3")
//     .text("*проект 4*", "project-4")
//   await ctx.callbackQuery.message?.editText("Выберите ваш проект", {
//     reply_markup:  inlineKeyboard
//   })
//   await ctx.answerCallbackQuery()
// })

// bot.callbackQuery([ "январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ], async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("Да, продолжить", "nextStepMonth").row()
//     .text("< Вернуться к выбору месяца", "backToMonths")
//   await ctx.callbackQuery.message?.editText(`Вы выбрали месяц: ${ctx.callbackQuery.data}`, {
//     reply_markup: inlineKeyboard
//   },)
//   await ctx.answerCallbackQuery()
// })

// bot.callbackQuery("nextStepMonth", async (ctx) => {
//   await ctx.conversation.enter("selectMonth");
//   await ctx.answerCallbackQuery()
// })

// bot.callbackQuery("backToMonths", async (ctx) => {
//   const inlineKeyboard = new InlineKeyboard()
//     .text("январь", "январь")
//     .text("февраль", "февраль")
//     .text("март", "март")
//     .text("апрель", "апрель").row()
//     .text("май", "май")
//     .text("июнь", "июнь")
//     .text("июль", "июль")
//     .text("август", "август").row()
//     .text("сентябрь", "сентябрь")
//     .text("октябрь", "октябрь")
//     .text("ноябрь", "ноябрь")
//     .text("декабрь", "декабрь")
//   await ctx.callbackQuery.message?.editText("Выберите месяц из списка", {
//     reply_markup: inlineKeyboard
//   })
//   await ctx.answerCallbackQuery()
// })

// bot.catch((err) => {
//   const ctx = err.ctx;
//   console.error(`Error while handling update ${ctx.update.update_id}:`);
//   const e = err.error;
//   if (e instanceof GrammyError) {
//     console.error("Error in request:", e.description);
//   } else if (e instanceof HttpError) {
//     console.error("Could not contact Telegram:", e);
//   } else {
//     console.error("Unknown error:", e);
//   }
// });

// bot.on("message", async (ctx) => {
//   const choiceDirection = new Keyboard()
//     .text("Учёт времени по месяцам").row()
//     .text("Учёт времени по проектам")
//   ctx.reply("Что-то пошло не так, давай заново...", {
//     reply_markup:  choiceDirection
//     })
// })

// bot.start()




import { Context } from "grammy";
import { startCommand } from "./startCommand";
import { myIdCommand } from "./myIdCommand";
import { supportCommand } from "./supportCommand";

export const registerCommands = (bot: any) => {
  bot.api.setMyCommands([
    { command: "start", description: "Запуск бота" },
    { command: "my_id", description: "Узнать свой id" },
    { command: "support", description: "Помощь" },
  ]);

  bot.command("start", startCommand);
  bot.command("my_id", myIdCommand);
  bot.command("support", supportCommand);
};





