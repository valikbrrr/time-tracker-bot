import { Context } from "grammy";
import { whitelist } from "./whitelist";

export const accessControl = (ctx: Context, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  if (userId && whitelist.includes(userId)) {
    return next(); 
  } else {
    return ctx.reply(
      `У вас нет доступа! 
Вот ваш id: ${userId}`);
  }
};
