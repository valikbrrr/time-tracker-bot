// src/conversations/createNewProject
import { MyConversation, MyContextConversation } from "../myContext";
import { InlineKeyboard } from "grammy";
import { authenticate } from "../googleSheets/authenticate";
import { timeTrackerProjModel } from "../db/modelProject";

export async function createNewProject(conversation: MyConversation, ctx: MyContextConversation) {

    const inlineKeyboard = new InlineKeyboard()
        .text("Сохранить название и продолжить", "nextStepCreateProject").row()
        .text("Изменить название", "BackToCreateProject");
        
    const nameOfNewProject = await conversation.wait();
    const projectName = nameOfNewProject.message?.text; // Это может быть undefined

    // Проверка на undefined
    await ctx.reply(`Поздравляю! Вы создали новый проект под названием: "${projectName}" 🥳`, {
        reply_markup: inlineKeyboard
    });
    
    const callbackQuery = await conversation.waitForCallbackQuery(["nextStepCreateProject", "BackToCreateProject"]);
    if (callbackQuery.callbackQuery.data === "nextStepCreateProject") {

        const inlineKeyboardTwo = new InlineKeyboard()
        .text("Открыть список проектов", "callbackOpenProjectList")
        // await callbackQuery.answerCallbackQuery();

        const NewCallbackQuery = callbackQuery.callbackQuery;

        if (!NewCallbackQuery || !NewCallbackQuery.message) {
            await ctx.reply("Ошибка: не удалось получить данные сообщения.");
            return;
        } 

        // console.log(NewCallbackQuery);
        const chatId = NewCallbackQuery.message?.chat.id;
        const messageId = NewCallbackQuery.message?.message_id;

        await ctx.api.editMessageText(chatId, messageId, " Вы создали новый проект, теперь вы можете открыть список проектов и добавить часы в свой проект", {
            reply_markup: inlineKeyboardTwo
        })

        const doc = await authenticate(process.env.PROJECT_SHEET_ID as string);
        await doc.loadInfo();
        const newSheet = await doc.addSheet({ title: projectName });
        newSheet.setHeaderRow(["Name", "Log", "Hours"]);
        timeTrackerProjModel.create({project: `${projectName}`, data: []})

    } else if (callbackQuery.callbackQuery.data === "BackToCreateProject") {

        const NewCallbackQuery = callbackQuery.callbackQuery;
        
        if (!NewCallbackQuery || !NewCallbackQuery.message) {
            await ctx.reply("Ошибка: не удалось получить данные сообщения.");
            return;
        } 

        try {
            await callbackQuery.answerCallbackQuery();
            const chatId = NewCallbackQuery.message.chat.id;
            const messageId = NewCallbackQuery.message.message_id;
    
            await ctx.api.editMessageText(chatId, messageId, `Введите название нового проекта:`);
        } catch (error) {
            // console.error("Ошибка при редактировании сообщения:", error);
            await ctx.reply("Не удалось обновить сообщение. Пожалуйста, попробуйте еще раз.");
        }
    
        await createNewProject(conversation, ctx);
    }
}

