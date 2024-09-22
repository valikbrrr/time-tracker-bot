import { addDataToMonthSheet } from "../googleSheets/addDataToMonthSheet";
import { currentYear } from "../utils/currentYear";
import { timeTrackerMonthModel } from "../db/modelMonth";

export const addToMonth = async (userName: string, userId: string, hoursInMonth: string, selectedMonth: string) => {
    console.log(`work addToMonth`);
    
    await addDataToMonthSheet(userName, userId, [hoursInMonth], selectedMonth); 

    const mainArr = await timeTrackerMonthModel.findOne({monthAndYear: `${selectedMonth} ${currentYear()}`})
    
    const updateArr = mainArr?.data

    updateArr?.push({name: userName, id: userId, hours: Number(hoursInMonth)})

    

    return await timeTrackerMonthModel.updateOne({monthAndYear: `${selectedMonth} ${currentYear()}`}, {data: updateArr})
}