// src/googleSheets.ts
import { timeTrackerProjModel } from '../db/modelProject';
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; 

authenticate(projectSheetId)

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[], selectedProject: string) => {
    try {
        console.log("work");
        
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[selectedProject];
        console.log(`selectedProject - ${selectedProject}`);
        
        const foundProject = await timeTrackerProjModel.findOne({ project: `${selectedProject}` });

        if (foundProject) {
            console.log(`foundProject - ${foundProject}`);
            
            for (const entry of foundProject.data) {
                console.log("for сущ");
                
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
            console.log("проект не найден");
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



