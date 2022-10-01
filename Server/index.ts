// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
import express from "express"
import { appendFile } from "fs";

const port = 3001

const server = express();

server.get('/',(req, res) => {
    res.json({
        "Success":"True",
        "Team":"Beryllium",
        "Team Members": [
            {"Name": "Mert Buyulu"},
            {"Name": "Minh Nguyen"},
            {"Name": "Srilokh Karuturi"},
            {"Name": "Michelle Gonzales"},
            {"Name": "Jon Abraham"}
        ]
    
    
    })
})

server.get('/books',(req, res) => {
    // FETCH THE DATA FROM DB

    // SEND THE DATA 
    res.json({"Success":"True", "data": "No Books"})
})


server.listen(port, "127.0.0.1", () => {
    console.log(`[server]: Server is running at http://127.0.0.1/:${port}`)
})


