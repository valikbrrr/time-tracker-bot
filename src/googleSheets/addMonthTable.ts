import { timeTrackerMonthModel } from '../db/modelMonth';
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTHS_SHEET_ID as string; // ID вашей таблицы

authenticate(monthSheetId);

export const addDataToMonthSheet = async (name: string, log: string, hours: string[], month: string) => {
    const year = currentYear();
    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`]; 
        
        // Fetch the month data
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });

        if (foundMonth && foundMonth.data.length > 0) {
            
            for (const entry of foundMonth.data) {
                console.log("for сущ");
                console.log(entry.name);
                console.log(name);

                if (entry.name === name) {
                    console.log("имя совпало");
                    await sheet.clearRows(); // Убедитесь, что это асинхронная операция
                    console.log("очистил");
                    await sheet.addRow({
                        Name: name,
                        Log: log,
                        Hours: hours.join(", "),
                    });
                    console.log("добавил");
                    break; // Выход из цикла после выполнения логики
                }  
            }
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

