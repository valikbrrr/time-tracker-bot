import { authenticate } from "../googleSheets/authenticate";

export const searchUser = async (userName: string, sheetId: string) => {
    const doc = await authenticate(sheetId);
    await doc.loadInfo();
    
} 