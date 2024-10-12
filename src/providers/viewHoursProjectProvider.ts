import { timeTrackerProjModel } from "../db/modelProject";
import { logger } from "../utils/logger";

export const viewHoursProjectProvider = async (
  userId: any,
  userSelectProject: string
) => {
  const data = await timeTrackerProjModel.findOne({
    project: userSelectProject,
  });

  logger.info(
    `PROVIDER userId - ${userId}, userSelectProject - ${userSelectProject}`
  );
  logger.info(`Data retrieved from DB:`, data);

  if (data) {
    logger.info(`Data exist`);

    const cleanedUserId = String(userId).trim();
    logger.info(`Filtered users for userId: ${cleanedUserId}`);

    const users = data.data.filter((user) => {
      logger.info(
        `Comparing userId: ${cleanedUserId} with user.id: ${user.id}`
      );
      return String(user.id) === cleanedUserId;
    });

    logger.info(`Filtered users:`, users);

    const totalHours = users.reduce((sum, user) => {
      const hours = user.hours ?? 0;
      return sum + hours;
    }, 0);

    if (totalHours > 0) {
      logger.info(`userHours - ${totalHours}`);
      return totalHours;
    } else {
      logger.info(`No matching users found, returning null`);
      return null;
    }
  }

  logger.info(
    `No data found for your project: ${userSelectProject}, returning null`
  );
  return null;
};
