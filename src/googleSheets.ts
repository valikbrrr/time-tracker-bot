// src/googleSheets.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = process.env.SHEET_ID as string; // ID вашей таблицы

// Функция для аутентификации
const authenticate = async () => {
    const auth = new JWT({
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Обработка многострочной строки
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    await auth.authorize(); // Авторизация

    const doc = new GoogleSpreadsheet(SHEET_ID, auth); // Передаем auth в конструктор
    return doc;
};

// Функция для добавления данных в таблицу
export const addDataToSheet = async (data: string[]) => {
    try {
        const doc = await authenticate();
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({ Data: data.join(", ") });
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};