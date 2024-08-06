// // src/conversations/selectProject.ts
// import { createConversation } from "@grammyjs/conversations";
// import { MyContext } from "../types";

// const selectProject = createConversation(async function selectProject(conversation, ctx: MyContext) {
//   await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");
//   const hoursOfProject = await conversation.wait();
//   await ctx.reply("Это всё, спасибо!");
// });

// export default selectProject;

import { MyConversation, MyContextConversation } from "../myContext";

export async function selectProject(conversation: MyConversation, ctx: MyContextConversation) {
    await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");

    let hoursOfProject: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursOfProject = response.message?.text;

        if (hoursOfProject && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursOfProject)) {
            break
        } else {
            await ctx.reply(`Кол-во часов можно ввести в промежутке от 1 до 744.`);
        }
    }
    await ctx.reply(`Вы ввели: ${hoursOfProject}. Это всё, спасибо!`);
}