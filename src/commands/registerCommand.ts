import { startCommand } from "./startCommand";
import { myIdCommand } from "./myIdCommand";
import { changeWhitelist } from "../changeWhitelist/changeWhitelist";

export const registerCommands = (bot: any) => {
  bot.api.setMyCommands([
    { command: "start", description: "Запуск бота" },
    { command: "my_id", description: "Узнать свой id" },
    { command: "change_list", description: "Изменить список пользователей" },
  ]);

  bot.command("start", startCommand);
  bot.command("my_id", myIdCommand);
  bot.command("change_list", changeWhitelist);
};
