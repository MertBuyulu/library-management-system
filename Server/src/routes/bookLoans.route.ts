// IMPORT EXPRESS
import express from "express";
import { createBookLoan, deleteBookLoan, getAllBookLoans, getBookLoan, getSomeBookLoans, updateBookLoan, updateBookLoans } from "../services/bookLoans.service";

// DEFINE ROUTER
const bookLoansRouter = express.Router();

// IMPORT SERVICES

console.log("[server] Routing bookLoans Request")

// DEFINE ROUTES
bookLoansRouter.get("/", getAllBookLoans);
bookLoansRouter.get("/:loan_id", getBookLoan);
bookLoansRouter.post("/loans", getSomeBookLoans)
bookLoansRouter.post("/", createBookLoan);
bookLoansRouter.delete("/:loan_id", deleteBookLoan)
bookLoansRouter.put("/:loan_id", updateBookLoan)
bookLoansRouter.put("/", updateBookLoans)

// EXPORT ROUTER 
export default bookLoansRouter;