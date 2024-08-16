import { Context } from "grammy";

export const supportCommand = async (ctx: Context) => {
  await ctx.reply(`Пока я ничем не могу вам помочь😔`);
};