import { timeTrackerProjModel } from "../db/modelProject";

export const existsProject = async () => {
  try {
    const projects = await timeTrackerProjModel.find({}, "project");
    console.log(projects);

    if (projects.length === 0) {
      return null;
    }

    return projects
      .map((proj) => proj.project)
      .filter((proj): proj is string => proj !== null && proj !== undefined);
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    throw error;
  }
};