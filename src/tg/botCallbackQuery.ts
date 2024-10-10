import { botStart } from "./botStart";
import {
  createNewProjectCallback,
  nextStepMonthFunc,
  nextStepProjectFunc,
} from "../function/funcForCallbackQuery";
import { callbackBackToMonth } from "../monthBranch/callbackBackToMonth";
import { MyContext } from "./myContext";
import { callbackBackToProject } from "../projectBranch/callbackBackToProject";
import { openProjectList } from "../projectBranch/openProjectList";

export const callbackQueryMap: Record<
  string,
  (ctx: MyContext) => Promise<void | string[]>
> = {
  ["botStart"]: botStart,
  ["Создать новый проект"]: createNewProjectCallback,
  ["callbackOpenProjectList"]: openProjectList,
  ["nextStepProject"]: nextStepProjectFunc,
  ["backToProjects"]: callbackBackToProject,
  ["nextStepMonth"]: nextStepMonthFunc,
  ["backToMonths"]: callbackBackToMonth,
  //   ["backToMonths"]: callbackBackToMonth,
  //   ["backToMonths"]: callbackBackToMonth,
  //   ["backToMonths"]: callbackBackToMonth,
  //   ["backToMonths"]: callbackBackToMonth,
};
