import express from "express";
import { prisma } from "../utils/PrismaClient"






// DEFINE TYPES
type Book = {
    isbn: string
    title: string
}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBooks = async (
    req: express.Request,
    res: express.Response
) => {
    console.log("[server] Getting all Books")
    return res.json(await prisma.book.findMany());
};

// DEFINE GET BORROWER
export const getBook = async (
    req: express.Request,
    res: express.Response
) => {
    const { isbn } = req.params;
    const book = await prisma.book.findUnique({
        where: {
            isbn: isbn,
        },
    });

    return res.json(book);
};

// DEFINE GET BORROWER
export const createBook = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const isbn = req.body['isbn'];
        const title = req.body['title'];

        const book: Book = {
            isbn: isbn,
            title: title
        };
        // OUTPUT TO CONSOLE
        console.log('Creating a new book : \n')

        // CREATE IN DATABASE
        const bookCreate = await prisma.book.create({
            data: book
        });

        return res.json(bookCreate);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.send(409).json({ message: err.message });
        }
    }
};


// 