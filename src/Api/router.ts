import express from "express";
import { getMonth, getProjects } from "./controllers";
import { addToMonth } from "../providers/addToMonth";
import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";

const router = express.Router();
console.log("router is loading...");

router.get("/current-month", (req, res) => {
    getMonth(res);
});

router.get("/exist-projects", (req, res) => {
    getProjects(res);
})

router.post("/add-hours", (req, res) => {
    const { userName, userLog, hoursInMonth, selectedMonth } = req.body; 
    return addToMonth(userName, userLog, hoursInMonth, selectedMonth); 
});

router.post("/view-hours-month", async (req, res) => {
    const { userId, userSelectMonth } = req.body;

    try {
        console.log(`Received userId: ${userId}, userSelectMonth: ${userSelectMonth}`);
        const { userHours, hours } = await viewHoursMonthProvider(userId, userSelectMonth);
        console.log(`userHours - "${userHours}"`);
        console.log(`2.hours - "${hours}"`);
        res.json({ hours });
    } catch (error) {
        console.error("Ошибка при получении данных о часах:", error);
        res.status(500).send('Ошибка сервера');
    }
});

export { router };