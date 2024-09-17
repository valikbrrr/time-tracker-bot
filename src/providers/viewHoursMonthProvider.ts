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

    const userHours = rows.filter(row => {
        const id = row.get('Id');
        console.log(`id - ${id}`);
        return id === userId; 
    });
    
    console.log(`userHours - ${userHours.toString()}`);

    const hours = userHours.map(row => {
        return Number(row.get('Hours') || 0); 
    }) 
    console.log(`1.hours - ${hours}`);

    return { userHours, hours };
}