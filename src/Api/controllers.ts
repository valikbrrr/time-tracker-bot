import { Request, Response } from "express";
import { currentMonth } from "../providers/currentMonth";
import { existsProject } from "../providers/existsProject";
import { addToMonth } from "../providers/addToMonth";
// import { AddHoursRequest } from "../interface/interfaces";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";
import { viewHoursProjectProvider } from "../providers/viewHoursProjectProvider";
import { addToProject } from "../providers/addToProject";

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


export const addToMonthController = async (userName: string, userId: string, hoursInMonth: string, selectedMonth: string, res: Response) => {
    console.log(`work addToMonthController`);
    try {
        await addToMonth(userName, userId, hoursInMonth, selectedMonth);
        res.status(200).send('Часы успешно добавлены');
    } catch (error) {
        console.error('Ошибка при добавлении часов:', error);
        res.status(500).send('Ошибка сервера');
    }
}


export const addToProjectController = async (userName: string, userId: string, hoursInMonth: string, selectedProject: string, res: Response) => {
    console.log(`work addToProjectController`);
    try {
        await addToProject(userName, userId, hoursInMonth, selectedProject);
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

export const viewProjectController = async (userId: string, userSelectProject: string, res: Response) => {
    try {
        const { hours } = await viewHoursProjectProvider(userId, userSelectProject);
        console.log(`hours in router - ${hours}`);
        res.json({ hours });
    } catch (error) {
        console.error("Ошибка при получении данных о часах:", error);
        res.status(500).send('Ошибка сервера');
        console.log(`catch`);
    }
}