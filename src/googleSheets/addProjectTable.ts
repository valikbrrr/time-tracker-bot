// src/googleSheets.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
// import { currentMonth } from './utils/currentMonth';
import { currentYear } from '../utils/currentYear';

const PROJECT_SHEET_ID = process.env.SHEET_ID as string; // ID вашей таблицы

// Функция для аутентификации
export const authenticate = async () => {
    const auth = new JWT({
        email: process.env.MONTHS_CLIENT_EMAIL,
        key: process.env.MONTHS_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Обработка многострочной строки
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    await auth.authorize(); // Авторизация

    const doc = new GoogleSpreadsheet(PROJECT_SHEET_ID, auth); // Передаем auth в конструктор
    return doc;
};

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[]) => {

    let year = currentYear()
    try {
        const doc = await authenticate();
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
