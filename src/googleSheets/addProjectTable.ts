// src/googleSheets.ts
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; // ID вашей таблицы

authenticate(projectSheetId)

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[], selectedProject: string) => {
    try {
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[selectedProject]; 
        
        await sheet.addRow({
            Name: name,
            Log: log,
            Hours: hours.join(", "),
        });
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};
