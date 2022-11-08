import express from "express";
import { REPL_MODE_SLOPPY } from "repl";
import { prisma, redis } from "../utils/PrismaClient"

// DEFINE TYPES
type Borrower = {
    card_id: string
    ssn: number
    bname: string
    address: string
    phone: string
}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllBorrowers = async (
    req: express.Request,
    res: express.Response
) => {
    console.log("[server] Getting all Borrowers")
    return res.json(await prisma.borrower.findMany());
};

// DEFINE GET BORROWER
export const getBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    const { card_id } = req.params;
    const borrower = await prisma.borrower.findUnique({
        where: {
            card_id: card_id,
        },
    });

    if (borrower) {
        return res.json(borrower);
    } else {
        return res.status(404).json({ "Success": "Failure", "Message": "Borrower not found." })
    }

};

// DEFINE GET 
export const createBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET VARIABLES FROM BODY
        const card_id = req.body['card_id'];
        const ssn = req.body['ssn'];
        const bname = req.body['bname'];
        const address = req.body['address'];
        const phone = req.body['phone'];

        const borrower: Borrower = {
            card_id: card_id,
            ssn: ssn,
            bname: bname,
            address: address,
            phone: phone,
        };

        // OUTPUT TO CONSOLE
        console.log('[server] Creating borrower ' + card_id)

        // CREATE IN DATABASE
        const borrowerCreate = await prisma.borrower.create({
            data: borrower
        });

        // RETURN
        return res.json(borrowerCreate);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.send(409).json({ message: err.message });
        }
    }
};


// DEFINE GET 
export const removeBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // DEFINE CARD_ID OF BORROWER TO REMOVE
        const { card_id } = req.params

        // CREATE IN DATABASE
        const borrowerRemoving = await prisma.borrower.delete({ where: { card_id: card_id } })

        // OUTPUT TO CONSOLE
        console.log('Removed ' + card_id + ' borrower');

        return res.json(borrowerRemoving);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json(err.message)
        }
    }
};


// DEFINE GET 
export const updateBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // DEFINE CARD_ID OF BORROWER TO REMOVE
        const { card_id } = req.params

        // DEFINE DATA
        const data = req.body

        // CREATE IN DATABASE
        const borrowerUpdating = await prisma.borrower.update({
            where: {
                card_id: card_id
            },
            data: data
        })

        // OUTPUT TO CONSOLE
        console.log('[server] Updated ' + card_id + ' borrower');

        return res.json(borrowerUpdating);

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json(err.message)
        }
    }
};