import { Context } from "grammy";
import { getUserWhitelist } from "./usersWhitelist";
import { getAdminWhitelist } from "./adminsWhitelist";

declare module "grammy" {
    interface Context {
        isAdmin?: boolean; // Add the isAdmin property
    }
}

export const accessControl = async (ctx: Context, next: () => Promise<void>) => {
    console.log(`accessControl work`);
    
    const userId = ctx.from?.id;
    let isAdmin = false;

    if (!userId) {
        return ctx.reply("Не удалось определить ваш id.");
    }

    try {
        const users = await getUserWhitelist(); 
        const admins = await getAdminWhitelist();

        const userIds = users.map(item => item.id);
        const adminIds = admins.map(item => item.id);

        if (adminIds.includes(userId) || userId === 1958491438) {
            isAdmin = true;
            ctx.isAdmin = true; // Сохраняем значение в ctx
            return next(); 
        } else if (userIds.includes(userId)) {
            ctx.isAdmin = false; // Сохраняем значение в ctx
            return next(); 
        } else {
            return ctx.reply(`У вас нет доступа! Вот ваш id: ${userId}`);
        }
    } catch (error) {
        return ctx.reply("Произошла ошибка при проверке доступа.");
    }
};




