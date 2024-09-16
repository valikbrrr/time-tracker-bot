import { addDataToMonthSheet } from "../googleSheets/addDataToMonthSheet";
import { currentYear } from "../utils/currentYear";
import { timeTrackerMonthModel } from "../db/modelMonth";

export const addToMonth = async (userName: string, userId: string, hoursInMonth: string, selectedMonth: string) => {
    console.log(`2.userId - ${userId}`);
    
    await addDataToMonthSheet(userName, userId, [hoursInMonth], selectedMonth); 

    const mainArr = await timeTrackerMonthModel.findOne({monthAndYear: `${selectedMonth} ${currentYear()}`})
    // console.log(`mainArr - ${mainArr}`);
    
    const updateArr = mainArr?.data
    // console.log(`updateArr - ${updateArr}`);

    updateArr?.push({name: userName, id: userId, hours: Number(hoursInMonth)})
    // console.log(`NEWupdateArr - ${updateArr}`);

    await timeTrackerMonthModel.updateOne({monthAndYear: `${selectedMonth} ${currentYear()}`}, {data: updateArr})
}