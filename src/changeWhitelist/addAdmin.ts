import { MyContextConversation, MyConversation } from "../myContext";
import { whitelistModel } from "../db/whitelist";

export async function addAdmin(conversation: MyConversation, ctx: MyContextConversation) {
    // Ждем, пока пользователь отправит новый ID администратора
    const newAdminId = await conversation.wait();
    const newAdmin = Number(newAdminId.message?.text);

    if (!newAdmin || isNaN(newAdmin)) {
        return ctx.reply("Пожалуйста, введите корректный ID администратора.");
    }

    try {
        const updateResult = await whitelistModel.updateOne(
            {},
            { $setOnInsert: { admins: [], users: [], type: "users" } },
            { upsert: true }
        );

        const result = await whitelistModel.updateOne(
            {},
            {
                $addToSet: { 
                    admins: { id: newAdmin },
                }
            }
        );

        if (result.modifiedCount === 0 && updateResult.modifiedCount === 0) {
            return ctx.reply(`Администратор с ID ${newAdmin} уже существует.`);
        }

        return ctx.reply(`Администратор с ID ${newAdmin} добавлен в администраторы`);
    } catch (error) {
        console.error(error);
        return ctx.reply("Произошла ошибка при добавлении администратора.");
    }
}