import { timeTrackerProjModel } from "../db/modelProject";
import { addDataToProjectSheet } from "../googleSheets/addProjectTable";

export const addToProject = async (
  userName: string,
  userId: string,
  hoursOfProject: string,
  selectedProject: string
) => {
  await addDataToProjectSheet(
    userName,
    userId,
    [hoursOfProject],
    selectedProject
  );

  const mainArr = await timeTrackerProjModel.findOne({
    project: `${selectedProject}`,
  });

  const updateArr = mainArr?.data;
  updateArr?.push({
    name: userName,
    id: userId,
    hours: Number(hoursOfProject),
  });

  await timeTrackerProjModel.updateOne(
    { project: `${selectedProject}` },
    { data: updateArr }
  );
};
