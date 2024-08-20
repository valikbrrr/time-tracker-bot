// src/googleSheets.ts
import { currentYear } from '../utils/currentYear';
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; // ID вашей таблицы

authenticate(projectSheetId)

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[]) => {
    let year = currentYear()
    try {
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[`q ${year} q`]; 
        
        await sheet.addRow({
            Name: name,
            Log: log,
            Hours: hours.join(", "),
        });
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};
