import { Request, Response } from "express";
import { currentMonth } from "../providers/currentMonth";
import { existsProject } from "../providers/existsProject";
import { addToMonth } from "../providers/addToMonth";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";
import { viewHoursProjectProvider } from "../providers/viewHoursProjectProvider";
import { addToProject } from "../providers/addToProject";
import { createProjectProvider } from "../providers/createProjectProvider";
import { logger } from "../utils/logger";

export const getMonth = (res: Response) => {
    const months = currentMonth();
    return res.json(months);
}

export const getProjects = async (res: Response) => {
    try {
        const projects = await existsProject(); 
        return res.json(projects);
    } catch (error) {
        logger.error('Ошибка при получении проектов:', error);
        return res.status(500).send('Ошибка сервера');
    }
}


export const addToMonthController = async (userName: string, userId: string, hoursInMonth: string, selectedMonth: string, res: Response) => {
    console.log(`work addToMonthController`);
    try {
        await addToMonth(userName, userId, hoursInMonth, selectedMonth);
        return res.status(200).send('Часы успешно добавлены');
    } catch (error) {
        logger.error('Ошибка при добавлении часов:', error);
        return res.status(500).send('Ошибка сервера');
    }
}


export const addToProjectController = async (userName: string, userId: string, hoursInMonth: string, selectedProject: string, res: Response) => {
    logger.info(`work addToProjectController`);
    try {
        await addToProject(userName, userId, hoursInMonth, selectedProject);
        return res.status(200).send('Часы успешно добавлены');
    } catch (error) {
        logger.error('Ошибка при добавлении часов:', error);
        return res.status(500).send('Ошибка сервера');
    }
}


export const viewMonthController = async (userId: string, userSelectMonth: string, res: Response) => {
    try {
        logger.info(`Received userId: ${userId}, userSelectMonth: ${userSelectMonth}`);
        const hours = await viewHoursMonthProvider(userId, userSelectMonth);
        logger.info(`finish hours - ${hours}, type: ${typeof hours}`);
        return res.json({ hours });
    } catch (error) {
        logger.info("Ошибка при получении данных о часах:", error);
        return res.status(500).send('Ошибка сервера');
    }
}

export const viewProjectController = async (userId: string, userSelectProject: string, res: Response) => {
    try {
        const hours = await viewHoursProjectProvider(userId, userSelectProject);
        logger.info(`hours in router - ${hours}, type: ${typeof hours}`);
        return res.json({ hours });
    } catch (error) {
        logger.error("Ошибка при получении данных о часах:", error);
        return res.status(500).send('Ошибка сервера');
    }
}


export const createProjectController = async (projectName: string, res: Response) => {
    try {
        createProjectProvider(projectName)
    } catch (error) {
        logger.error("Ошибка при получении данных о часах:", error);
        logger.info(`catch`);
        return res.status(500).send('Ошибка сервера');
    }
}