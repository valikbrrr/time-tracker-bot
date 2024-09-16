import { MyConversation, MyContextConversation } from "../myContext";
import { addDataToProjectSheet } from "../googleSheets/addProjectTable";
import { Keyboard } from "grammy";
import { timeTrackerProjModel } from "../db/modelProject";
import { addToProject } from "../providers/addToProject";

export async function selectProject(conversation: MyConversation, ctx: MyContextConversation) {

    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";
    const userId = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный логин";
    const selectedProject = ctx.session.selected?.substring(8); // Получаем выбранный проект
    
    if (!selectedProject) {
        await ctx.reply("Ошибка: выбранный месяц не определён. Пожалуйста, попробуйте снова.");
        return;
    }

    await ctx.reply("Какое кол-во часов вы работали над этим проектом?⏰");


    let hoursOfProject: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursOfProject = response.message?.text;

        if (hoursOfProject && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursOfProject)) {
           addToProject(userName, userId, hoursOfProject, selectedProject)

            const choiceDirection = new Keyboard()
            .text("Учёт времени по месяцам").row()
            .text("Учёт времени по проектам");

            await ctx.reply(`Вы ввели: ${hoursOfProject}. Данные записаны в таблицу!`, {
                reply_markup: choiceDirection
            });
            break
        } else {
            await ctx.reply(`Кол-во часов можно ввести в промежутке от 1 до 744.`);
        }
    }
} 