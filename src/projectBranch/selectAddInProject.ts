import { Keyboard } from "grammy";
import { MyContext } from "../tg/myContext";

export const selectAddInProject = async (ctx: MyContext) => {
  const projectSelectOrCreate = new Keyboard()
    .text("Открыть список проектов")
    .row()
    .text("Создать новый проект")
    .oneTime();
  await ctx.reply("Что вы хотите сделать?", {
    reply_markup: projectSelectOrCreate,
  });
};
