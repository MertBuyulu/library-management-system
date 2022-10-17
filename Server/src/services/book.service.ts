import express from 'express'
import { Module } from 'module'


const getAllBooks = async (req: express.Request, res: express.Response) => {
    return res.json({
        "Success": "True",
        "Endpoint": "/book"
    
    })
}


export const BookService = {
    getAllBooks
}
