

import { Prisma } from "@prisma/client";
import express from "express";
import { prisma } from "../utils/PrismaClient"


// DEFINE TYPES
interface Fine extends Prisma.finesUncheckedCreateInput {

}

// DEFINE GET ALL BORROWERS ROUTE
export const getAllFines = async (
    req: express.Request,
    res: express.Response
) => {
    const onlyMeta: Boolean = Boolean(req.query["onlyMeta"])

    if (onlyMeta == true) {
        console.log("[server] Getting Fines Meta")
        return res.json({ "Amount": await prisma.fines.count() })
    }
    console.log("[server] Getting all Fines")
    return res.json(await prisma.fines.findMany());
};

// DEFINE GET BORROWER
export const getFine = async (
    req: express.Request,
    res: express.Response
) => {
    const { loan_id } = req.params;
    const fine = await prisma.fines.findUnique({
        where: {
            loan_id: loan_id,
        },
    });

    if (fine) {
        console.log("[server] Retrieved fine " + loan_id);
        return res.json(fine);
    }
    else {
        console.log("[server] Could not retrieve fine" + loan_id)
        return res.status(400).json(loan_id);
    }
};

// DEFINE GET BORROWER
export const createFine = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // GET QUERY PARAMS
        const loan_id: string = req.body['loan_id'];
        const fine_amount = Number(req.body['fine_amount']);
        const paid = Boolean(req.body['paid']);

        const fine: Fine = {
            loan_id: loan_id,
            fine_amount: fine_amount,
            paid: paid
        };

        // CREATE IN DATABASE
        const fineCreate = await prisma.fines.create({
            data: fine
        });


        if (fineCreate) {
            console.log('[server] Created a new fine ' + loan_id)
            return res.json(fineCreate);
        } else {
            return res.status(404).json({ "Success": "Failure", "Message": "Fine could not be created." })
        }

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.send(409).json({ message: err.message });
        }
    }
};


// DELETE BOOK 
export const deleteFine = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { loan_id } = req.params

    // DELETE fine
    const deletingfine = await prisma.fines.delete({ where: { loan_id: loan_id } })

    if (deletingfine) {
        return res.json(deletingfine)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Fine could not be deleted due to non existent resource." })
    }
}

export const updateFine = async (req: express.Request, res: express.Response) => {
    // GET fine FROM PARAMS
    const { loan_id } = req.params

    // GET DATA FROM ISBN
    const data = req.body

    // IF THE REMAINING BALANCE IS NOT ZERO, THEN SET PAID FIELD TO FALSE
    data.paid = data.fine_amount? false: true
    
   //UPDATE
    const updatedFine = await prisma.fines.update({ where: { loan_id: loan_id }, data: data})

    // ERROR HANDLING
    if (updatedFine) {
        return res.json(updatedFine)
    } else {
        return res.status(400).json({ "Success": "Failure", "Message": "Could not update fine for some reason" })
    }
}

export const updateFines = async (req: express.Request, res: express.Response) => {

    const SelectedIDs: string[] = Array.from(req.body)
    
    // UPDATE FINES
    await prisma.fines.updateMany({where: {"loan_id": {in: SelectedIDs}}, data: {fine_amount: 0, paid: true}})

    // FETCH THE UPDATED FINES
    const updatedFines = await prisma.fines.findMany()

        if (updatedFines) {
            return res.json(updatedFines);
        } else {
            return res.status(400).json({ message: "[server] Could not retrieve selected book loans" });
    }
}


export const refreshFines = async (req: express.Request, res: express.Response) => {
   console.log("refreshing...")

   const {date} = req.body

   // STEP 1: FIND ALL BOOK LOANS THAT HAVEN'T BEEN RETURNED AS OF TODAY
   const loans_not_returned = await prisma.book_loans.findMany({
         where : {date_in: null},
   })

   // STEP 2: FIND ALL "LATE" BOOK LOANS THAT HAVEN'T BEEN RETURNED AS OF TODAY
   const late_loans_not_returned = loans_not_returned.filter((loan) => {
    console.log(loan.due_date)
    console.log(loan.due_date < date)
    return String(loan.due_date) < date
   })

   

   // 2. UPDATE STEP 
        // 2.1 LOAN IS STILL OUT AND NOT PAID [PAID = FALSE] -> UPDATE ITS FINE AMOUNT [(today - due_date) * $0.25]
        // 2.2 LOAN IS RETURNED BUT NOT PAID [PAID = FALSE] -> DO NOTHING
        // 2.3 LOAN IS RETURNED AND PAID -> DO NOTHING

    // RETURN ALL FINES [UPDATED/NEW/NOT_UPDATED] AS JSON TO THE CLIENT
}


