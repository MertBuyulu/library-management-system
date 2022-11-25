import express from "express";
import { createFine, deleteFine, getAllFines, getFine, updateFine, refreshFines } from "../services/bookFines.service";

// DEFINE ROUTER
const finesRouter = express.Router();

console.log("[server] Routing bookFines Request")


// IMPLEMENT ROUTES
finesRouter.get("/", getAllFines);
finesRouter.get("/:loan_id", getFine);
finesRouter.post("/", createFine);
finesRouter.put("/:loan_id", updateFine);
finesRouter.put("/", refreshFines)
finesRouter.delete("/:loan_id", deleteFine);


export default finesRouter;