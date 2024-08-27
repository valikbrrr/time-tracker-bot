// src/googleSheets.ts
import { timeTrackerProjModel } from '../db/modelProject';
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; 

authenticate(projectSheetId);

// Функция для добавления данных в таблицу
export const addDataToProjectSheet = async (name: string, log: string, hours: string[], selectedProject: string) => {
    try {
        console.log("work");
        
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[selectedProject];

        const foundProject = await timeTrackerProjModel.findOne({ project: selectedProject });

        if (foundProject && foundProject.data.length > 0) {
            let rowIndexToDelete: number | null = null;
            const rows = await sheet.getRows();

            for (const entry of foundProject.data) {
                console.log("for сущ");

                if (entry.name === name) {
                    console.log("имя совпало");
                    rowIndexToDelete = rows.findIndex((row) => row.get('Name') === name); 
                    console.log("индекс для удаления:", rowIndexToDelete);
                }
            }

            let totalHours = 0;

            // Если строка найдена, добавляем существующие часы
            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                const existingHours = rows[rowIndexToDelete].get('Hours');
                if (existingHours) {
                    totalHours += existingHours.split(", ").reduce((sum: number, hour: string) => sum + (parseFloat(hour) || 0), 0);
                }
                await rows[rowIndexToDelete].delete(); // Удаляем строку по найденному индексу
                console.log("удалил строку");
            }

            // Суммируем новые часы
            const newHoursTotal = hours.reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
            totalHours += newHoursTotal;

            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: totalHours.toString(),
            });
            console.log("добавил");

        } else {
            const totalHours = hours.reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
            await sheet.addRow({
                Name: name,
                Log: log,
                Hours: totalHours.toString(),
            });
            console.log("пользователь записывает часы в первый раз");
        }
        
    } catch (error) {
        console.error("Ошибка при добавлении данных в таблицу:", error);
    }
};