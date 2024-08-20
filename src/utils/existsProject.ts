// import { google } from "googleapis"
// import { authenticate } from "../googleSheets/authenticate";
// import { JWT } from "google-auth-library";

// export const existsProject = async () => {
//     let projectArr:string[] = []

//     const auth = new JWT({
//         email: process.env.CLIENT_EMAIL,
//         key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Обработка многострочной строки
//         scopes: ['https://www.googleapis.com/auth/spreadsheets']
//     })

//     const sheets = google.sheets({ version: "v4", auth: auth })

//     const spreadsheetId =

//     async function main() {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId,
//             range: "A1:A", // Range to read
//           });
//     }
// }




import { google } from "googleapis";
import { JWT } from "google-auth-library";
import { log } from "console";

// Load the credentials from the service account key file
export const existsProject = async () => {
    // Create a new JWT client using the credentials
    const client = new JWT({
        email: process.env.CLIENT_EMAIL,
        key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'), // Обработка многострочной строки
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    // Authorize and create a Google Sheets API instance
    const sheets = google.sheets({ version: "v4", auth: client });

    try {
        // Your spreadsheet ID
        const spreadsheetId = process.env.PROJECT_SHEET_ID as string;

        // Get spreadsheet details including sheet names
        const response = await sheets.spreadsheets.get({
            spreadsheetId,
        });

        const sheetsInfo = response.data.sheets;
        if (sheetsInfo) {
            // console.log();
            sheetsInfo.forEach(sheet => {
                console.log(sheet.properties?.title); // Вывод названия листа
            });
            // console.log(sheetsInfo);
        } else {
            console.log("No sheets found.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}