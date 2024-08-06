// import { Bot } from "grammy";
// import whitelist from "./whitelist";
// import { MyContext } from "../types";

// export default (bot: Bot<MyContext>) => {
//   bot.use(whitelist);
// };

import { Context } from "grammy";
import { whitelist } from "./whitelist";

export const accessControl = (ctx: Context, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  if (userId && whitelist.includes(userId)) {
    return next(); 
  } else {
    return ctx.reply("Вам доступ ограничен");
  }
};
