import { timeTrackerProjModel } from "../db/modelProject";

export const viewHoursProjectProvider = async (userId: string, userSelectProject: string) => {
    const data = await timeTrackerProjModel.findOne({ project: userSelectProject });

    console.log(`data - ${data}`);
    console.log(`userSelectProject - ${userSelectProject}`);

    if (data) {
        // Находим всех пользователей с таким же id
        const users = data.data.filter((user) => user.id === userId);
        
        // Суммируем часы всех найденных пользователей, игнорируя null и undefined
        const totalHours = users.reduce((sum, user) => {
            const hours = user.hours ?? 0; // Если hours null или undefined, используем 0
            return sum + hours;
        }, 0);
        
        if (totalHours > 0) {
            console.log(`userHours - ${totalHours}`);
            return totalHours; // Возвращаем общие часы
        } else {
            return null; 
        }
    }
    
    return null;
}



// console.log(`userSelectProject - ${userSelectProject}`);

// const projectSheetId = process.env.PROJECT_SHEET_ID as string;

// const doc = await authenticate(projectSheetId);
// await doc.loadInfo();

// const sheet = doc.sheetsByTitle[userSelectProject];
// if (!sheet) {
//     console.log(`minus`);
//     throw new Error(`Лист "${userSelectProject}" не найден.`);
    
// }

// const rows = await sheet.getRows();


// const userHours = rows.filter((row) => {
//     const id = row.get('Id');
//     return id === userId; 
// });

// const hours = userHours.map(row => {
//     return Number(row.get('Hours') || 0); 
// }) 

// return { userHours, hours };