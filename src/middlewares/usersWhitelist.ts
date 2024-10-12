import { whitelistModel } from "../db/whitelist";

export const getUserWhitelist = async () => {
  try {
    const results = await whitelistModel.find();
    const dataArray = results.map((item) => item.users).flat();
    return dataArray;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error; // или обработайте ошибку по-своему
  }
};

