import { Context } from "grammy";

export const myIdCommand = async (ctx: Context) => {
  await ctx.reply(`Вот ваш id: ${ctx.from?.id}`);
};