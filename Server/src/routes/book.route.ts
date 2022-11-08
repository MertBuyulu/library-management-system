// router.get("/:id", getBorrowers)
// router.post("/", createPost);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);


import express from "express";

// DEFINE ROUTER
const borrowerRouter = express.Router();

// IMPORT SERVICES
import { createBook, getAllBooks, getBook } from "../services/book.service";

// / 
borrowerRouter.get("/", getAllBooks);
borrowerRouter.get("/:isbn", getBook);
borrowerRouter.post("/", createBook);


export default borrowerRouter;