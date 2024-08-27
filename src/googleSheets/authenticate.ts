import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export const authenticate = async (sheetId:string) => {
    const auth = new JWT({
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Обработка многострочной строки
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    await auth.authorize(); // Авторизация

    const doc = new GoogleSpreadsheet(sheetId, auth); // Передаем auth в конструктор
    return doc;
};
