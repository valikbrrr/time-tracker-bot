import express from "express";
import { getMonth, getProjects } from "./controllers";

const router = express.Router();
console.log("Server file is loading...");

router.get("/current-month", (req, res) => {
    getMonth(res);
});

router.get("/exist-projects", (req, res) => {
    getProjects(res);
})


export { router };