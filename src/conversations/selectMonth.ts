//src/conversations/selectMonth.ts
import { MyConversation, MyContextConversation } from "../myContext";
import { addDataToSheet } from "../googleSheets"; // Импортируем функцию
import { currentMonth } from "../utils/currentMonth";

export async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
    const months:string[] = await currentMonth()
    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";
    const userLog = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный логин";

    let sheetId: number;

    sheetId = 0;


    await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");

    let hoursInMonth: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursInMonth = response.message?.text;

        if (hoursInMonth && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursInMonth)) {
            // Записываем данные в таблицу с использованием sheetId
            await addDataToSheet(userName, userLog, [hoursInMonth], sheetId);
            await ctx.reply(`Вы ввели: ${hoursInMonth}. Данные записаны в таблицу!`);
            break; // Ввод корректен, выходим из цикла
        } else {
            await ctx.reply("Кол-во часов можно ввести в промежутке от 1 до 744.");
        }
    }
}