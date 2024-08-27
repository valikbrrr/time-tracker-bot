import { whitelistModel } from "../db/whitelist";

export const getAdminWhitelist = async () => {
    try {
        const results = await whitelistModel.find();
        const dataArray = results.map(item => item.admins).flat();
        return dataArray;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error; // или обработайте ошибку по-своему
    }
}

