import { MyConversation, MyContextConversation } from "../myContext";
import { InlineKeyboard } from "grammy";

export async function createNewProject(conversation: MyConversation, ctx: MyContextConversation) {
    const inlineKeyboard = new InlineKeyboard()
        .text("Сохранить название и продолжить", "nextStepCreate").row()
        .text("Изменить название", "BackToCreateProject");
        
    const nameOfNewProject = await conversation.wait();
    await ctx.reply(`Поздравляю! Вы создали новый проект под названием: "${nameOfNewProject.message?.text}" 🥳`, {
        reply_markup: inlineKeyboard
    });
    
    const callbackQuery = await conversation.waitForCallbackQuery(["nextStepCreate", "BackToCreateProject"]);
    if (callbackQuery.callbackQuery.data === "nextStepCreate") {
        await callbackQuery.answerCallbackQuery();
        await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");

        let hoursOfNewProj: string | undefined;

        while (true) {
            const response = await conversation.wait();
            hoursOfNewProj = response.message?.text;

            if (hoursOfNewProj && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursOfNewProj)) {
                break
            } else {
                await ctx.reply(`Кол-во часов можно ввести в промежутке от 1 до 744.`);
            }
        }
        await ctx.reply(`Вы ввели: ${hoursOfNewProj}. Это всё, спасибо!`);
    } else if (callbackQuery.callbackQuery.data === "BackToCreateProject") {
        await callbackQuery.answerCallbackQuery();
        await ctx.reply(`Введите название нового проекта:`);
        await createNewProject(conversation, ctx);
    }
}