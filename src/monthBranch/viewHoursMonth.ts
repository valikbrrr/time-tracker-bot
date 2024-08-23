import { Context} from "grammy"
import { openProjectList } from "../projectBranch/openProjectList"

export const viewHoursMonth = async (ctx: Context) => {
  openProjectList(ctx)
  await ctx.reply("Выберите проект, в котором вы хотите узнать количество часов")
}