import { authenticate } from "../googleSheets/authenticate";

export const viewHoursProjectProvider = async (userId: string, userSelectProject: string) => {
    console.log(`userSelectProject - ${userSelectProject}`);
    
    const projectSheetId = process.env.PROJECT_SHEET_ID as string;
    
    const doc = await authenticate(projectSheetId);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle[userSelectProject];
    if (!sheet) {
        console.log(`minus`);
        throw new Error(`Лист "${userSelectProject}" не найден.`);
        
    }

    const rows = await sheet.getRows();
    

    const userHours = rows.filter((row) => {
        const id = row.get('Id');
        return id === userId; 
    });

    const hours = userHours.map(row => {
        return Number(row.get('Hours') || 0); 
    }) 

    return { userHours, hours };
}