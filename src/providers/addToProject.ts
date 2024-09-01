import { timeTrackerProjModel } from "../db/modelProject"
import { addDataToProjectSheet } from "../googleSheets/addProjectTable"

export const addToProject = async (userName: string, userLog: string, hoursOfProject: string, selectedProject: string) => {
    await addDataToProjectSheet(userName, userLog, [hoursOfProject], selectedProject)
            
    const mainArr = await timeTrackerProjModel.findOne({project: `${selectedProject}`})

    const updateArr = mainArr?.data
    updateArr?.push({name: userName, id: userLog, hours: Number(hoursOfProject)})

    await timeTrackerProjModel.updateOne({project: `${selectedProject}`}, {data: updateArr})
}