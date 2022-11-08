// router.get("/:id", getBorrowers)
// router.post("/", createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);

// IMPORT EXPRESS
import express from "express";

// DEFINE ROUTER
const borrowerRouter = express.Router();

// IMPORT SERVICES
import {
    createBorrower,
    getAllBorrowers,
    getBorrower
} from "../services/bookBorrower.service";

console.log("[server] Routing Borrower Request")

// DEFINE ROUTES
borrowerRouter.get("/", getAllBorrowers);
borrowerRouter.get("/:id", getBorrower);
borrowerRouter.post("/", createBorrower);

// EXPORT ROUTER 
export default borrowerRouter;