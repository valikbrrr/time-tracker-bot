import { MyConversation, MyContextConversation } from "../myContext";
import { addDataToSheet } from "../googleSheets"; // Импортируем функцию

export async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
    await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");

    let hoursInMonth: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursInMonth = response.message?.text; // Извлекаем текст сообщения

        // Проверяем, что введенное значение является числом от 1 до 744
        if (hoursInMonth && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursInMonth)) {
            // Записываем данные в таблицу
            await addDataToSheet([hoursInMonth]);
            await ctx.reply(`Вы ввели: ${hoursInMonth}. Данные записаны в таблицу!`);
            break; // Ввод корректен, выходим из цикла
        } else {
            await ctx.reply("Кол-во часов можно ввести в промежутке от 1 до 744.");
        }
    }
}