// src/utils/existsProject
import { google } from "googleapis";
import { JWT } from "google-auth-library";

export const existsProject = async () => {
    const client = new JWT({
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.PROJECT_SHEET_ID as string;

    const response = await sheets.spreadsheets.get({ spreadsheetId });

    const sheetNames: string[] = [];

    response.data.sheets?.forEach(sheet => {
        if (sheet.properties?.title) {
            sheetNames.push(sheet.properties.title);
        } 
    });
    
    return sheetNames;
}