// IMPORT EXPRESS
import express from "express";

// DEFINE ROUTER
const bookLoansRouter = express.Router();

// IMPORT SERVICES
import {
    getAllFines, getFine, createFine, deleteFine, updateFine
} from "../services/bookLoans.service";

console.log("[server] Routing Borrower Request")

// DEFINE ROUTES
bookLoansRouter.get("/", getAllFines);
bookLoansRouter.get("/:loan_id", getFine);
bookLoansRouter.post("/", createFine);
bookLoansRouter.delete("/:loan_id", deleteFine)
bookLoansRouter.put("/:loan_id", updateFine)
// EXPORT ROUTER 
export default bookLoansRouter;