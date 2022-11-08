import express from 'express'
import { Module } from 'module'


export const getAllBooks = async (req: express.Request, res: express.Response) => {
    return res.json({
        "Success": "True",
        "Endpoint": "/book"
    
    })
}

