import { timeTrackerProjModel } from "../db/modelProject";
import { authenticate } from "../googleSheets/authenticate";

export const createProjectProvider = async (projectName: string) => {
    const doc = await authenticate(process.env.PROJECT_SHEET_ID as string);
    await doc.loadInfo();
    const newSheet = await doc.addSheet({ title: projectName });
    newSheet.setHeaderRow(["Name", "Log", "Hours"]);
    timeTrackerProjModel.create({project: `${projectName}`, data: []})
}