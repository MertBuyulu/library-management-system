// IMPORT EXPRESS
import express from "express";

// DEFINE ROUTER
const borrowerRouter = express.Router();

// IMPORT SERVICES
import {
    createBorrower,
    getAllBorrowers,
    getBorrower,
    removeBorrower,
    updateBorrower
} from "../services/bookBorrower.service";

console.log("[server] Routing Borrower Request")

// DEFINE ROUTES
borrowerRouter.get("/", getAllBorrowers);
borrowerRouter.get("/:card_id", getBorrower);
borrowerRouter.post("/", createBorrower);
borrowerRouter.delete("/:card_id", removeBorrower)
borrowerRouter.put("/:card_id", updateBorrower)
// EXPORT ROUTER 
export default borrowerRouter;