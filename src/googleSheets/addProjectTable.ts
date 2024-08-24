// src/googleSheets.ts
import { timeTrackerProjModel } from '../db/modelProject';
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; 

authenticate(projectSheetId)

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[], selectedProject: string) => {
    try {
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[selectedProject];
        
        const foundProject = await timeTrackerProjModel.findOne({ project: `${selectedProject}` });

        if (foundProject) {
            for (const entry of foundProject.data) {
                if (entry.name === name) {
                    console.log("имя совпало");
                    await sheet.clearRows(); 
                    console.log("очистил");
                    await sheet.addRow({
                        Name: name,
                        Log: log,
                        Hours: hours.join(""),
                    });
                    console.log("добавил");
                    break; 
                } else {
                    console.log("имя не совпало");
                }
            }
        } else {
            console.log("месяц не найден");
        }
        
        // await sheet.addRow({
        //     Name: name,
        //     Log: log,
        //     Hours: hours.join(", "),
        // });
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};
