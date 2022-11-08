import express from 'express'
import { Module } from 'module'

// DEFINE PRISMA CLIENT
import {PrismaClient}  from '@prisma/client'
const prisma = new PrismaClient()

// DEFINE GET ALL BORROWERS ROUTE
const getAllBorrowers = async (req: express.Request, res: express.Response) => {
    return res.json(await prisma.borrower.findMany())
}

const getBorrower = async (req: express.Request, res: express.Response) => {
    return res.json(await prisma.borrower.findMany())
}


export const BorrowerService = {
    getAllBorrowers
}
