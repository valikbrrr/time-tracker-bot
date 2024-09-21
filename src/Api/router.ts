import express from "express";
import { addToMonthController, addToProjectController, getMonth, getProjects, viewMonthController, viewProjectController,  } from "./controllers";
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
    addToMonthController(userName, userId, hoursInMonth, selectedMonth, res); 
});

router.post("/add-hours-project", (req, res) => {
    const { userName, userId, hoursInProject, selectedProject } = req.body; 
    console.log(`userName - ${userName}`);
    console.log(`userId - ${userId}`);
    console.log(`hoursInMonth - ${hoursInProject}`);
    console.log(`selectedProject - ${selectedProject}`);
    addToProjectController(userName, userId, hoursInProject, selectedProject, res); 
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