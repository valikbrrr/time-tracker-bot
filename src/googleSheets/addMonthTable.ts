import { timeTrackerMonthModel } from '../db/modelMonth';
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTH_SHEET_ID as string;
authenticate(monthSheetId);

export const addDataToMonthSheet = async (name: string, log: string, hours: string[], month: string) => {
    const year = currentYear();
    try {
        console.log("work");
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`];
        console.log(`selectedProject - ${month} ${year}`);
         
        
        // Fetch the month data
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });
        console.log(`foundMonth - ${foundMonth}`);
        

        if (foundMonth && foundMonth.data.length > 0) {
            console.log(`Найден месяц: ${foundMonth}`);
            let rowIndexToDelete: number | null = null;

            const rows = await sheet.getRows(); // Получаем строки как GoogleSpreadsheetRow

            for (const entry of foundMonth.data) {
                console.log("for сущ");

                if (entry.name === name) {
                    console.log("имя совпало");
                    rowIndexToDelete = rows.findIndex((row) => row.get('Name') === name); // Используем доступ по ключу
                    console.log("индекс для удаления:", rowIndexToDelete);
                    break; // Выход из цикла после выполнения логики
                }  
            }

            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                await rows[rowIndexToDelete].delete(); // Удаляем строку по найденному индексу
                console.log("удалил строку");
            }

            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });
            console.log("добавил");

        } else {
            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });
            console.log("пользователь записывает часы в первый раз");
        }
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};