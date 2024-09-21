// src/googleSheets.ts
import { timeTrackerProjModel } from '../db/modelProject';
import { authenticate } from './authenticate';

const projectSheetId = process.env.PROJECT_SHEET_ID as string; 

authenticate(projectSheetId);

export const addDataToProjectSheet = async (name: string, id: string, hours: string[], selectedProject: string) => {
    try {
        
        const doc = await authenticate(projectSheetId);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[selectedProject];

        const foundProject = await timeTrackerProjModel.findOne({ project: selectedProject });

        if (foundProject && foundProject.data.length > 0) {
            let rowIndexToDelete: number | null = null;
            const rows = await sheet.getRows();

            for (const entry of foundProject.data) {

                if (entry.id === id) {
                    rowIndexToDelete = rows.findIndex((row) => row.get('Id') === id); 
                }
            }

            let totalHours = 0;

            if (rowIndexToDelete !== null && rowIndexToDelete >= 0) {
                const existingHours = rows[rowIndexToDelete].get('Hours');
                if (existingHours) {
                    totalHours += existingHours.split(", ").reduce((sum: number, hour: string) => sum + (parseFloat(hour) || 0), 0);
                }
                await rows[rowIndexToDelete].delete();
            }

            const newHoursTotal = hours.reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
            totalHours += newHoursTotal;

            await sheet.addRow({ 
                Name: name,
                Id: id,
                Hours: totalHours.toString(),
            });

        } else {
            const totalHours = hours.reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
            await sheet.addRow({
                Name: name,
                Id: id,
                Hours: totalHours.toString(),
            });
        }
        
    } catch (error) {
    }
};