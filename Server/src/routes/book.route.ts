// router.get("/:id", getBorrowers)
// router.post("/", createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);


import express from "express";

// DEFINE ROUTER
const borrowerRouter = express.Router();

// IMPORT SERVICES
import { getAllBooks } from "../services/book.service";

borrowerRouter.get("/", getAllBooks);


export default borrowerRouter;