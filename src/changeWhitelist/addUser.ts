import { MyContextConversation, MyConversation } from "../tg/myContext";
import { whitelistModel } from "../db/whitelist";

export async function addUser(
  conversation: MyConversation,
  ctx: MyContextConversation
) {
  const newUserId = await conversation.wait();
  const newUser = newUserId.message?.text;

  if (!newUser || /^-?\d+$/.test(newUser)) {
    return ctx.reply("Пожалуйста, введите корректный ID пользователя.");
  }

  try {
    const updateResult = await whitelistModel.updateOne(
      {},
      { $setOnInsert: { admins: [], users: [] } },
      { upsert: true }
    );

    const result = await whitelistModel.updateOne(
      {},
      {
        $addToSet: {
          users: { id: newUser },
        },
      }
    );

    if (result.modifiedCount === 0 && updateResult.modifiedCount === 0) {
      return ctx.reply(`Пользователь с ID ${newUser} уже существует.`);
    }

    return ctx.reply(`Пользователь с ID ${newUser} добавлен`);
  } catch (error) {
    console.error(error);
    return ctx.reply("Произошла ошибка при добавлении пользователя.");
  }
}
