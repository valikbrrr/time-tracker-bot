import { timeTrackerProjModel } from "../db/modelProject";
import { authenticate } from "../googleSheets/authenticate";
import { logger } from "../utils/logger";

export const createProjectProvider = async (projectName: string) => {
  logger.info(`createProjectProvider`);

  try {
    if (
      !projectName ||
      typeof projectName !== "string" ||
      projectName.trim() === ""
    ) {
      return { message: "Название проекта не может быть пустым." };
    }

    logger.info("Аутентификация...");
    const doc = await authenticate(process.env.PROJECT_SHEET_ID as string);
    await doc.loadInfo();
    logger.info("Создание нового листа...");
    const newSheet = await doc.addSheet({ title: projectName });
    newSheet.setHeaderRow(["Name", "Id", "Hours"]);

    logger.info("Запись в базу данных...");
    await timeTrackerProjModel.create({ project: projectName, data: [] });

    logger.info("Проект успешно создан");
  } catch (error) {
    logger.error("Ошибка при создании проекта:", error);
  }
};
