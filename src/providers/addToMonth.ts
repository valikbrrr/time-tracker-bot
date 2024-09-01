import { addDataToMonthSheet } from "../googleSheets/addMonthTable";
import { currentYear } from "../utils/currentYear";
import { timeTrackerMonthModel } from "../db/modelMonth";

export const addToMonth = async (userName: string, userLog: string, hoursInMonth: string, selectedMonth: string) => {
   
    await addDataToMonthSheet(userName, userLog, [hoursInMonth], selectedMonth); 

    const mainArr = await timeTrackerMonthModel.findOne({monthAndYear: `${selectedMonth} ${currentYear()}`})

    const updateArr = mainArr?.data
    updateArr?.push({name: userName, id: userLog, hours: Number(hoursInMonth)})

    await timeTrackerMonthModel.updateOne({monthAndYear: `${selectedMonth} ${currentYear()}`}, {data: updateArr})
}