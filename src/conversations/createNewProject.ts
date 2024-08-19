// src/conversations/createNewProject
import { MyConversation, MyContextConversation } from "../myContext";
import { InlineKeyboard } from "grammy";
import { authenticate } from "../googleSheets/addMonthTable";
import { addDataToProjectSheet } from "../googleSheets/addProjectTable"; // Импортируйте функцию для записи данных
import { log } from "console";

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
    
    // Создание нового листа в таблице
    // const doc = await authenticate();
    // await doc.loadInfo();
    // await doc.addSheet({ title: projectName }); // Создаем новый лист с названием проекта
    
    const callbackQuery = await conversation.waitForCallbackQuery(["nextStepCreate", "BackToCreateProject"]);
    if (callbackQuery.callbackQuery.data === "nextStepCreateProject") {
        await callbackQuery.answerCallbackQuery();
        await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");
        
        let hoursOfNewProj: string | undefined;
        
        while (true) {
            const response = await conversation.wait();
            hoursOfNewProj = response.message?.text;
            
            if (hoursOfNewProj && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursOfNewProj)) {
                break;
            } else {
                await ctx.reply(`Кол-во часов можно ввести в промежутке от 1 до 744.`);
            }
        }
        
        if (!projectName) {
            await ctx.reply("Название проекта не может быть пустым. Пожалуйста, введите заново:");
            return createNewProject(conversation, ctx); // Запросите название снова
        }
        
        // Запись данных в новый лист
        await addDataToProjectSheet(projectName, "Запись часов", [hoursOfNewProj]);
        await ctx.reply(`Вы ввели: ${hoursOfNewProj}. Это всё, спасибо!`);
    } else if (callbackQuery.callbackQuery.data === "BackToCreateProject") {

        console.log(callbackQuery.callbackQuery);


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

