import { timeTrackerMonthModel } from '../db/modelMonth';
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTH_SHEET_ID as string;
authenticate(monthSheetId);

export const addDataToMonthSheet = async (name: string, log: string, hours: string[], month: string) => {
    const year = currentYear();
    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`];
        
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });
        

        if (foundMonth && foundMonth.data.length > 0) {
            console.log(`Найден месяц: ${foundMonth}`);
            let rowIndexToDelete: number | null = null;

            const rows = await sheet.getRows(); 

            for (const entry of foundMonth.data) {

                if (entry.name === name) {
                    rowIndexToDelete = rows.findIndex((row) => row.get('Name') === name); 
                    break; 
                }  
            }

            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                await rows[rowIndexToDelete].delete(); 
            }

            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });

        } else {
            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });
        }
        
    } catch (error) {
    }
};