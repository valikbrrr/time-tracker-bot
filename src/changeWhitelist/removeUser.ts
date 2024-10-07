import { whitelistModel } from "../db/whitelist";
import { MyContextConversation, MyConversation } from "../tg/myContext";

export async function removeUser(
  conversation: MyConversation,
  ctx: MyContextConversation
) {
  const removeUser = await conversation.wait();
  const removeUserId = Number(removeUser.message?.text);

  // Проверяем корректность введенного ID
  if (!removeUserId || isNaN(removeUserId)) {
    return ctx.reply("Пожалуйста, введите корректный ID пользователя.");
  }

  try {
    const userList = await whitelistModel.find({});
    const users = userList[0].users;

    users.map(async (item) => {
      if (item.id === removeUserId) {
        const newArr = userList[0].users.filter((el) => el.id !== removeUserId);
        console.log(newArr);
        await whitelistModel.updateOne(
          { type: "users" },
          { $set: { users: newArr } }
        );
      }
    });
    return ctx.reply(`Пользователь с ID ${removeUserId} удалён`);
  } catch (error) {
    console.error(error);
    return ctx.reply("Произошла ошибка при удалении пользователя.");
  }
}
