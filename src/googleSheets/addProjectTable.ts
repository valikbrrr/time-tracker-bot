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
        // console.log(`selectedProject - ${selectedProject}`);
        
        const foundProject = await timeTrackerProjModel.findOne({ project: `${selectedProject}` });

        // console.log(`foundProject - ${foundProject}`);

        if (foundProject && foundProject.data.length > 0) {
            let rowIndexToDelete: number | null = null;
            const rows = await sheet.getRows();
            // console.log(`Найден проект: ${foundProject}`);
            for (const entry of foundProject.data) {
                console.log("for сущ");
                console.log(entry.name);
                console.log(name);

                if (entry.name === name) {
                    console.log("имя совпало");
                    rowIndexToDelete = rows.findIndex((row) => row.get('Name') === name); 
                    console.log("индекс для удаления:", rowIndexToDelete);
                }
            }

            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                await rows[rowIndexToDelete].delete(); // Удаляем строку по найденному индексу
                console.log("удалил строку");
            }

            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });
            console.log("добавил");

        } else {
            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: hours.join(", "),
            });
            console.log("пользователь записывает часы в первый раз");
        }
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};



