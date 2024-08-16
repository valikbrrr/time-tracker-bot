import { startCommand } from "./startCommand";
import { myIdCommand } from "./myIdCommand";
import { supportCommand } from "./supportCommand";

export const registerCommands = (bot: any) => {
  bot.api.setMyCommands([
    { command: "start", description: "Запуск бота" },
    { command: "my_id", description: "Узнать свой id" },
    { command: "support", description: "Помощь" },
  ]);

  bot.command("start", startCommand);
  bot.command("my_id", myIdCommand);
  bot.command("support", supportCommand);
};





