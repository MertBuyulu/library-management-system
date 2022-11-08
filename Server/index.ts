// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import express from "express"
import {BookService} from "./src/services/book.service"
import {BorrowerService} from "./src/services/bookBorrower.service"
import PrismaClient from "@prisma/client"
const port = 3001 


const server = express();

server.get('/',(req: express.Request, res: express.Response) => {
    res.json({
        "Success":"True",
        "Team":"Beryllium",
        "Team Members": [
            {"Name": "Mert Buyulu"},
            {"Name": "Minh Nguyen", "Role": "Front-End Dev"},
            {"Name": "Srilokh Karuturi", "Role": "Lead"},
            {"Name": "Michelle Gonzales", "Role": "Programmer"},
            {"Name": "Jonathan Abraham", "Role": "Team Member"}
        ]
    })
})

server.get('/book', (req, res) => BookService.getAllBooks(req, res))

server.get('/borrower', (req, res) => BorrowerService.getAllBorrowers(req, res))



server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/`)
})



