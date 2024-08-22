import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTHS_SHEET_ID as string; // ID вашей таблицы

authenticate(monthSheetId)

// Функция для добавления данных в таблицу
export const addDataToMonthSheet = async (name: string, log: string, hours: string[], month: string) => {

    let year = currentYear()
    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`]; 

        await sheet.addRow({
            Name: name,
            Log: log,
            Hours: hours.join(", "),
        });
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};
