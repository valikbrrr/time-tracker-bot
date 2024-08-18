// src/conversations/selectMonth.ts
import { MyConversation, MyContextConversation } from "../myContext";
import { addDataToSheet } from "../googleSheets";

export async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";
    const userLog = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный логин";
    const selectedMonth = ctx.session.selectedMonth; // Получаем выбранный месяц

    if (!selectedMonth) {
        await ctx.reply("Ошибка: выбранный месяц не определён. Пожалуйста, попробуйте снова.");
        return;
    }

    await ctx.reply(`Какое кол-во часов вы работали в ${selectedMonth}?⏰`);

    let hoursInMonth: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursInMonth = response.message?.text;

        if (hoursInMonth && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursInMonth)) {
            await addDataToSheet(userName, userLog, [hoursInMonth], selectedMonth); // Передаем месяц
            await ctx.reply(`Вы ввели: ${hoursInMonth}. Данные записаны в таблицу!`);
            break;
        } else {
            await ctx.reply("Кол-во часов можно ввести в промежутке от 1 до 744.");
        }
    }
}



