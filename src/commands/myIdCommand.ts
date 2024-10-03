import { MyContext } from "../myContext";

export const myIdCommand = async (ctx: MyContext) => {
  await ctx.reply(`Вот ваш id: ${ctx.from?.id}`);
};