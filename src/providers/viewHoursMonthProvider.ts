import { timeTrackerMonthModel } from "../db/modelMonth";
import { currentYear } from "../utils/currentYear";
import { logger } from "../utils/logger";

export const viewHoursMonthProvider = async (userId: string, userSelectMonth: string) => {
    const year = currentYear();
    const monthAndYear = `${userSelectMonth} ${year}`;
    const data = await timeTrackerMonthModel.findOne({ monthAndYear: monthAndYear });
    
    logger.info(`userSelectMonth - ${userSelectMonth}; year - ${year}`);
    
    if (data) {
        logger.info(`if in provider work`)
        const users = data.data.filter((user) => user.id === userId);
        if (users.length > 0) {
            const lastUser = users[users.length - 1];
            console.log(`userHours - ${lastUser.hours}`);
            return lastUser.hours; 
        } else {
            logger.info(`else - return null`)
            return null; 
        }
    }
    
    return null; 
}

