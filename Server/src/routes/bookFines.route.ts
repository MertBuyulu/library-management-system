import express from "express";
import { createFine, deleteFine, getAllFines, getFine, updateFine } from "../services/bookFines.service";

// DEFINE ROUTER
const finesRouter = express.Router();

// IMPORT SERVICES


// IMPLEMENT ROUTES
finesRouter.get("/", getAllFines);
finesRouter.get("/:loan_id", getFine);
finesRouter.post("/", createFine);
finesRouter.put("/:loan_id", updateFine);
finesRouter.delete("/:loan_id", deleteFine);


export default finesRouter;