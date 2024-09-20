import express from "express";
import { addToMonthController, getMonth, getProjects, viewMonthController, viewProjectController,  } from "./controllers";
import { addToMonth } from "../providers/addToMonth";
// import { viewHoursMonthProvider } from "../providers/viewHoursMonthProvider";

const router = express.Router();
console.log("router is loading...");

router.get("/current-month", (req, res) => {
    getMonth(res);
});

router.get("/exist-projects", (req, res) => {
    getProjects(res);
})

router.post("/add-hours-month", (req, res) => {
    const { userName, userId, hoursInMonth, selectedMonth } = req.body; 
    console.log(`work router.post`);
    console.log(`userName - ${userName}`);
    console.log(`userId - ${userId}`);
    console.log(`hoursInMonth - ${hoursInMonth}`);
    console.log(`selectedMonth - ${selectedMonth}`);
    addToMonthController(userName, userId, hoursInMonth, selectedMonth, res); 
});

router.post("/view-hours-month", async (req, res) => {
    const { userId, userSelectMonth } = req.body;
    viewMonthController(userId, userSelectMonth, res)
});

router.post("/view-hours-project", async (req, res) => {
    const { userId, userSelectProject } = req.body;
    viewProjectController(userId, userSelectProject, res)
});

export { router };