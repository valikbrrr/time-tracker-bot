import { timeTrackerMonthModel } from "../db/modelMonth";
// import { authenticate } from "../googleSheets/authenticate";
import { currentYear } from "../utils/currentYear";

export const viewHoursMonthProvider = async (userId: string, userSelectMonth: string) => {
    const year = currentYear()
    const monthAndYear = `${userSelectMonth} ${year}`;
    const data = await timeTrackerMonthModel.findOne( {monthAndYear: monthAndYear})
    console.log(`data - ${data}`);
    console.log(`userSelectMonth - ${userSelectMonth}; year - ${year}`);
    
    if (data) {
        const user = data.data.filter((user) => user.id === userId)
        console.log(user[0].hours);
        return user[0].hours
    }
    return new Error("unnable to find month and year") ;
}
// // const monthSheetId = process.env.MONTH_SHEET_ID as string;

// // const doc = await authenticate(monthSheetId);
// // await doc.loadInfo();

// const year = currentYear() 
// const sheetName = `${userSelectMonth} ${year}`; 

// const sheet = doc.sheetsByTitle[sheetName];
// if (!sheet) {
//     throw new Error(`Лист "${sheetName}" не найден.`);
// }

// const rows = await sheet.getRows();

// const userHours = rows.filter(row => {
//     const id = row.get('Id');
//     return id === userId; 
// });
// // id === userId ? hours : null
// // userHours передаёт просто "true"
// //!!!!!


// const hours = userHours.map(row => {
//     return Number(row.get('Hours') || 0); 
// }) 

// return { userHours, hours };