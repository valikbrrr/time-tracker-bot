import { authenticate } from "../googleSheets/authenticate";
import { currentYear } from "../utils/currentYear";

export const viewHoursMonthProvider = async (userId: string, userSelectMonth: string) => {
    const monthSheetId = process.env.MONTH_SHEET_ID as string;

    const doc = await authenticate(monthSheetId);
    await doc.loadInfo();

    const year = currentYear() 
    const sheetName = `${userSelectMonth} ${year}`; 

    const sheet = doc.sheetsByTitle[sheetName];
    if (!sheet) {
        throw new Error(`Лист "${sheetName}" не найден.`);
    }

    const rows = await sheet.getRows();

    const userHours = rows.filter((row: { get: (arg0: string) => any; }) => {
        const id = row.get('Id');
        return id === userId; 
    });

    const hours = userHours.reduce((total: number, row: { get: (arg0: string) => any; }) => total + Number(row.get('Hours') || 0), 0); // Суммируем часы

    return { userHours, hours }; // Возвращаем объект с данными
}