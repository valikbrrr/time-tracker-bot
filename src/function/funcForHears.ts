import { MyContext } from "../tg/myContext";

export const addAdminFunc = async (ctx: MyContext) => {
  if (ctx.isAdmin) {
    await ctx.reply("Напишите id нового администратора");
    await ctx.conversation.enter(`addAdmin`);
  }
};

export const addUserFunc = async (ctx: MyContext) => {
  if (ctx.isAdmin) {
    await ctx.reply(`Напишите id нового пользователя`);
    await ctx.conversation.enter(`addUser`);
  }
};

export const deleteUserFunc = async (ctx: MyContext) => {
  if (ctx.isAdmin) {
    await ctx.reply(`Напишите id пользователя, которого нужно удалить`);
    await ctx.conversation.enter(`removeUser`);
  }
};

export const createNewProjectHears = async (ctx: MyContext) => {
  await ctx.reply(`Введите название нового проекта:`);
  await ctx.conversation.enter(`createNewProject`);
};
