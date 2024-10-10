import { botStart } from "./botStart";
import {
  addAdminFunc,
  addUserFunc,
  createNewProjectHears,
  deleteUserFunc,
} from "../function/funcForHears";
import { openMonthList } from "../monthBranch/openMonthList";
import { selectMonthBranch } from "../monthBranch/selectMonthBranch";
import { viewHoursMonth } from "../monthBranch/viewHoursMonth";
import { MyContext } from "./myContext";
import { openProjectList } from "../projectBranch/openProjectList";
import { selectAddInProject } from "../projectBranch/selectAddInProject";
import { selectProjectBranch } from "../projectBranch/selectProjectBranch";
import { viewHoursProject } from "../projectBranch/viewHoursProject";

export const hearsMap: Record<
  string,
  (ctx: MyContext) => Promise<void | string[]>
> = {
  ["Добавить администратора"]: addAdminFunc,
  ["Добавить пользователя"]: addUserFunc,
  ["Удалить пользователя"]: deleteUserFunc,
  ["Учёт времени по месяцам"]: selectMonthBranch,
  ["Учёт времени по проектам"]: selectProjectBranch,
  ["Добавить часы за месяц"]: openMonthList,
  ["Посмотреть ранее введённые часы за месяц"]: viewHoursMonth,
  ["Посмотреть ранее введённые часы в проектах"]: viewHoursProject,
  ["Добавить часы за проект"]: selectAddInProject,
  ["Открыть список проектов"]: openProjectList,
  ["Создать новый проект"]: createNewProjectHears,
  ["< Вернуться в начало"]: botStart,
};
