import express from "express";
import { getMonth, getProjects, viewHoursFromMonth } from "./controllers";
import { addToMonth } from "../providers/addToMonth";

const router = express.Router();
console.log("Server file is loading...");

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

router.get("/view-hours-month", (req, res) => {
    viewHoursFromMonth
})


export { router };