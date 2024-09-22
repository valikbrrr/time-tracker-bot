import { timeTrackerProjModel } from "../db/modelProject";

export const viewHoursProjectProvider = async (userId: string, userSelectProject: string) => {
    const data = await timeTrackerProjModel.findOne({ project: userSelectProject });

    console.log(`data - ${data}`);
    console.log(`userSelectProject - ${userSelectProject}`);

    if (data) {
        const users = data.data.filter((user) => user.id === userId);
        
        const totalHours = users.reduce((sum, user) => {
            const hours = user.hours ?? 0; 
            return sum + hours;
        }, 0);
        
        if (totalHours > 0) {
            console.log(`userHours - ${totalHours}`);
            return totalHours; 
        } else {
            return null; 
        }
    }
    
    return null;
}

