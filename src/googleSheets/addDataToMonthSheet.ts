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
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`];
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });

        if (foundMonth && foundMonth.data.length > 0) {
            let rowIndexToDelete: number | null = null;
            const rows = await sheet.getRows(); 

            for (const entry of foundMonth.data) {
                if (entry.id === id) {
                    rowIndexToDelete = rows.findIndex((row) => row.get('Id') === id);
                    break; 
                }  
            }
  
            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                await rows[rowIndexToDelete].delete(); 
            }
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });

        } else {
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
    }
};