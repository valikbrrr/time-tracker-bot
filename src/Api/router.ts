import express from "express";
import { getMonth, getProjects, viewMonthController,  } from "./controllers";
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
    viewMonthController(userId, userSelectMonth, res)
});

// router.post("/view-hours-project", async (req, res) => {
//     const { userId, userSelectProject } = req.body;

//     viewProjectController(userId, userSelectProject)

//     // try {
//     //     console.log(`
//     //         project: 
//     //         Received userId: ${userId}, userSelectMonth: ${userSelectProject}`);
//     //     const { hours } = await viewHoursMonthProvider(userId, userSelectProject);
//     //     console.log(`hours in router - ${hours}`);
//     //     res.json({ hours });
//     // } catch (error) {
//     //     console.error("Ошибка при получении данных о часах:", error);
//     //     res.status(500).send('Ошибка сервера');
//     //     console.log(`catch`);
//     // }
// });

export { router };