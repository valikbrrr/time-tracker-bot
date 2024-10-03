import { timeTrackerProjModel } from "../db/modelProject";

export const existsProject = async () => {
    try {
        const projects = await timeTrackerProjModel.find({}, "project");
        console.log(projects);

        if (projects.length === 0) {
            return null;
        }

        return projects
            .map(proj => proj.project)
            .filter((proj): proj is string => proj !== null && proj !== undefined);
    } catch (error) {
        console.error('Ошибка при получении проектов:', error);
        throw error;
    }
}



// const client = new JWT({
//     email: process.env.CLIENT_EMAIL,
//     key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     scopes: ['https://www.googleapis.com/auth/spreadsheets']
// });

// const sheets = google.sheets({ version: "v4", auth: client });
// const spreadsheetId = process.env.PROJECT_SHEET_ID as string;

// const response = await sheets.spreadsheets.get({ spreadsheetId });

// const sheetNames: string[] = [];

// response.data.sheets?.forEach(sheet => {
//     if (sheet.properties?.title) {
//         sheetNames.push(sheet.properties.title);
//     } 
// });
// console.log(`sheetNames - ${sheetNames}`);
// return sheetNames;