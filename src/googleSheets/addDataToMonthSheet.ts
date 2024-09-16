import { timeTrackerMonthModel } from '../db/modelMonth';
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const monthSheetId = process.env.MONTH_SHEET_ID as string;
authenticate(monthSheetId);

export const addDataToMonthSheet = async (name: string, id: string, hours: string[], month: string) => {
    console.log(`3.userId - ${id}`);
    const year = currentYear();
    try {
        const doc = await authenticate(monthSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`${month} ${year}`];
        
        const foundMonth = await timeTrackerMonthModel.findOne({ monthAndYear: `${month} ${year}` });
        

        if (foundMonth && foundMonth.data.length > 0) {
            console.log(`Найдена информация: ${foundMonth}`);
            let rowIndexToDelete: number | null = null;

            const rows = await sheet.getRows(); 
            console.log(rows);
            

            for (const entry of foundMonth.data) {

                if (entry.id === id) {
                    console.log(`entry.id - ${entry.id}`);
                    console.log(`id - ${id}`);
                    rowIndexToDelete = rows.findIndex((row) => row.get('Id') === id); 
                    console.log(`rowIndexToDelete - ${rowIndexToDelete}`);
                    break; 
                }  
            }
  
            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                console.log(`work-1`);
                
                await rows[rowIndexToDelete].delete(); 
            }

            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });

        } else {
            console.log(`else`);
            
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: hours.join(", "),
            });
        }
        
    } catch (error) {
        console.log(`catch`);
    }
};