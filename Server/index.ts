// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import express from "express"
import borrowerRouter from "./src/routes/borrower.route"
import bookRouter from "./src/routes/book.route"
import cors from "cors"
import PrismaClient from "@prisma/client"
import bodyParser from "body-parser";

const port = 3001
export const server = express();
server.use(cors())
server.use(bodyParser.json({ limit: "30mb" }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

server.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        "Success": "True",
        "Team": "Beryllium",
        "Team Members": [
            { "Name": "Mert Buyulu" },
            { "Name": "Minh Nguyen", "Role": "Front-End Dev" },
            { "Name": "Srilokh Karuturi", "Role": "Lead" },
            { "Name": "Michelle Gonzales", "Role": "Programmer" },
            { "Name": "Jonathan Abraham", "Role": "Team Member" }
        ]
    })
})

server.use('/borrower', borrowerRouter)
server.use('/book', bookRouter)

server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/`)
})
