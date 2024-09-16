import { timeTrackerProjModel } from "../db/modelProject";
import { authenticate } from "../googleSheets/authenticate";

export const createProjectProvider = async (projectName: string) => {
    try {
        if (!projectName || typeof projectName !== 'string' || projectName.trim() === '') {
            return ({ message: 'Название проекта не может быть пустым.' });
        }

        console.log('Аутентификация...');
        const doc = await authenticate(process.env.PROJECT_SHEET_ID as string);
        await doc.loadInfo();
        console.log('Создание нового листа...');
        const newSheet = await doc.addSheet({ title: projectName });
        newSheet.setHeaderRow(["Name", "Id", "Hours"]);
        
        console.log('Запись в базу данных...');
        await timeTrackerProjModel.create({ project: projectName, data: [] });
        
        console.log("Проект успешно создан");
    } catch (error) {
        console.error('Ошибка при создании проекта:', error);
    }
};