import { timeTrackerMonthModel } from "../db/modelMonth";
import { currentYear } from "../utils/currentYear";

export const viewHoursMonthProvider = async (userId: string, userSelectMonth: string) => {
    const year = currentYear();
    const monthAndYear = `${userSelectMonth} ${year}`;
    const data = await timeTrackerMonthModel.findOne({ monthAndYear: monthAndYear });
    
    console.log(`data - ${data}`);
    console.log(`userSelectMonth - ${userSelectMonth}; year - ${year}`);
    
    if (data) {
        const users = data.data.filter((user) => user.id === userId);
        if (users.length > 0) {
            const lastUser = users[users.length - 1];
            console.log(`userHours - ${lastUser.hours}`);
            return lastUser.hours; 
        } else {
            return null; 
        }
    }
    
    return null; 
}

