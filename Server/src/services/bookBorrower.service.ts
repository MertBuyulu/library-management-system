import express from "express";
import { Module } from "module";

// DEFINE PRISMA CLIENT
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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

export const getBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    const { id: borrowerID } = req.params;
    const borrower = await prisma.borrower.findUnique({
        where: {
            card_id: borrowerID,
        },
    });
    return res.json(borrower);
};

/*
{
    "card_id": "",
    "ssn": ,
    "bname": "",
    "address": "",
    "phone": ""
}
*/
export const createBorrower = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        console.log(req.body)
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
        console.log('Creating a new borrower : \n')
        console.log(borrower)

        // CREATE IN DATABASE
        const borrowerCreate = await prisma.borrower.create({
            data: {
                card_id: card_id,
                ssn: ssn,
                bname: bname,
                address: address,
                phone: phone,
            }
        });

        return res.send(200).json(borrowerCreate);

    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(409).json({ message: err.message });
        }
    }
};
