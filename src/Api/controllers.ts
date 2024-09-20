import { Request, Response } from "express";
import { currentMonth } from "../providers/currentMonth";
import { existsProject } from "../providers/existsProject";
import { addToMonth } from "../providers/addToMonth";
import { AddHoursRequest } from "../interface/interfaces";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";

export const getMonth = (res: Response) => {
    const months = currentMonth();
    return res.json(months);
}

export const getProjects = async (res: Response) => {
    try {
        const projects = await existsProject(); 
        return res.json(projects);
    } catch (error) {
        console.error('Ошибка при получении проектов:', error);
        res.status(500).send('Ошибка сервера');
    }
}

export const addHours = async (req: Request<{}, {}, AddHoursRequest>, res: Response) => {
    const { userName, userId, hoursInMonth, selectedMonth } = req.body;

    try {
        await addToMonth(userName, userId, hoursInMonth, selectedMonth);
        res.status(200).send('Часы успешно добавлены');
    } catch (error) {
        console.error('Ошибка при добавлении часов:', error);
        res.status(500).send('Ошибка сервера');
    }
}

export const viewMonthController = async (userId: string, userSelectMonth: string, res: Response) => {
    try {
        console.log(`Received userId: ${userId}, userSelectMonth: ${userSelectMonth}`);
        const { hours } = await viewHoursMonthProvider(userId, userSelectMonth);
        res.json({ hours });
    } catch (error) {
        console.error("Ошибка при получении данных о часах:", error);
        res.status(500).send('Ошибка сервера');
    }
}

// export const viewProjectController = (userName: string, userSelectMonth: string) => {
//     viewHoursProjectProvider(userName, userSelectMonth)
// }