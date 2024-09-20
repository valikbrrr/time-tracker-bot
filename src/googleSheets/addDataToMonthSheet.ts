import mongoose from 'mongoose';
import { timeTrackerMonthModel } from '../db/modelMonth';
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTH_SHEET_ID as string;
authenticate(monthSheetId);

const uri = process.env.DB_CONN_STRING;
if (!uri) {
    throw new Error('DB_CONN_STRING is not defined');
}

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 20000, // Увеличили таймаут до 20 секунд
    socketTimeoutMS: 45000, // Увеличили таймаут сокета до 45 секунд
});

export const addDataToMonthSheet = async (name: string, id: string, hours: string[], month: string) => {
    console.log(`work addDataToMonthSheet`);
    
    const year = currentYear();
    try {
        console.log(`work try - 1`);
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`];
        console.log(`month - ${month}; type of month - ${typeof month}`);
        console.log(`year - ${year}; type of year - ${typeof year}`);
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });
        console.log(`work - 2`);

        if (foundMonth && foundMonth.data.length > 0) {
            console.log(`work - 3`);
            let rowIndexToDelete: number | null = null;
            console.log(`work - 4`);
            const rows = await sheet.getRows(); 

            for (const entry of foundMonth.data) {
                console.log(`work - 5`);
                if (entry.id === id) {
                    rowIndexToDelete = rows.findIndex((row) => row.get('Id') === id);
                    console.log(`work - 6`);
                    break; 
                }  
            }
  
            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                console.log(`work - 7`);
                await rows[rowIndexToDelete].delete(); 
            }
            console.log(`work - 8`);
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });

        } else {
            console.log(`work else - 9`);
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });
        }
        console.log(`work - 10`);
        
    } catch (error) {
        console.error('Ошибка:', error);
        console.log(`catch`);
        // Обработка ошибки
    }
};