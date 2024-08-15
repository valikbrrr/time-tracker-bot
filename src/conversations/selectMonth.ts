//src/conversations/selectMonth.ts
import { MyConversation, MyContextConversation } from "../myContext";
import { addDataToSheet } from "../googleSheets"; // Импортируем функцию

export async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
    const userName = ctx.from?.username || ctx.from?.first_name || "Неизвестный пользователь";
    const userLog = ctx.from?.id ? ctx.from.id.toString() : "Неизвестный логин";

    // Получаем выбранный месяц из сессии
    const selectedMonth = ctx.session.selectedMonth;
    let sheetId: number;

    // Устанавливаем sheetId в зависимости от выбранного месяца
    switch (selectedMonth) {
        case "январь":
            sheetId = 1033182509;
            break;
        case "февраль":
            sheetId = 466382034;
            break;
        case "март":
            sheetId = 1416528187;
            break;
        case "апрель":
            sheetId = 1128060955;
            break;
        case "май":
            sheetId = 1790092075;
            break;
        case "июнь":
            sheetId = 1624505079;
            break;
        case "июль":
            sheetId = 2058435237;
            break;
        case "август":
            sheetId = 845726399;
            break;
        case "сентябрь":
            sheetId = 70678115;
            break;
        case "октябрь":
            sheetId = 2042131550;
            break;
        case "ноябрь":
            sheetId = 845908161;
            break;
        case "декабрь":
            sheetId = 931183873;
            break;
        default:
            await ctx.reply("Неизвестный месяц. Попробуйте снова.");
            return;
    }

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