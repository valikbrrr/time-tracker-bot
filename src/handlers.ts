// // src/handlers.ts
// // import { Bot, Keyboard } from "grammy";
// // import { MyContextConversation, MyContextHydrate } from "./types";

// // export default (bot: Bot) => {
// //   bot.on("message", async (ctx: MyContext ) => {
// //     const choiceDirection = new Keyboard()
// //       .text("Учёт времени по месяцам").row()
// //       .text("Учёт времени по проектам")
// //     ctx.reply("Что-то пошло не так, давай заново...", {
// //       reply_markup: choiceDirection
// //     })
// //   })
// // };




// // src/handlers.ts
// import { Bot, Context } from "grammy";

// export const handlers = (bot: Bot) => {
//   bot.on("message", async (ctx: Context) => {
//     ctx.reply("Что-то пошло не так, давай заново...");
//   });

//   bot.catch((err) => {
//     console.error("Error while handling update:", err);
//   });
// };



import { Context } from "grammy";
import { Keyboard } from "grammy";

export const handleMessage = async (ctx: Context) => {
  const choiceDirection = new Keyboard()
    .text("Учёт времени по месяцам").row()
    .text("Учёт времени по проектам");
  await ctx.reply("Что-то пошло не так, давай заново...", {
    reply_markup: choiceDirection,
  });
};



