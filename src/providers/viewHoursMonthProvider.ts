import { timeTrackerMonthModel } from "../db/modelMonth";
import { currentYear } from "../utils/currentYear";
import { logger } from "../utils/logger";

export const viewHoursMonthProvider = async (
  userId: any,
  userSelectMonth: string
) => {
  const year = currentYear();
  const monthAndYear = `${userSelectMonth} ${year}`.trim();
  const data = await timeTrackerMonthModel.findOne({
    monthAndYear: monthAndYear,
  });

  logger.info(
    `PROVIDER userId - ${userId}, userSelectMonth - ${userSelectMonth}`
  );
  logger.info(`PROVIDER userSelectMonth - ${userSelectMonth}; year - ${year}`);
  logger.info(`Data retrieved from DB:`, data);

  if (data) {
    logger.info(`if in provider work`);

    // Преобразование userId в строку, если это необходимо
    const cleanedUserId = String(userId).trim();
    logger.info(`Filtered users for userId: ${cleanedUserId}`);

    const users = data.data.filter((user) => user.id === cleanedUserId);
    logger.info(`Filtered users:`, users);

    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      logger.info(`userHours - ${lastUser.hours}`);
      return lastUser.hours;
    } else {
      logger.info(`No matching users found, returning null`);
      return null;
    }
  }

  logger.info(
    `No data found for monthAndYear: ${monthAndYear}, returning null`
  );
  return null;
};
