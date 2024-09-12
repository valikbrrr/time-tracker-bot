import { currentMonth } from "../providers/currentMonth";
import { Response } from "express";
import { existsProject } from "../providers/existsProject";


export const getMonth = (res: Response) => {
    const months =  currentMonth();
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