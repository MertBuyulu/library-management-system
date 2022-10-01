"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
const express_1 = __importDefault(require("express"));
const port = 3001;
const server = (0, express_1.default)();
server.get('/', (req, res) => {
    res.json({
        "Success": "True",
        "Team": "Beryllium",
        "Team Members": [
            { "Name": "Mert Buyulu" },
            { "Name": "Minh Nguyen" },
            { "Name": "Srilokh Karuturi" },
            { "Name": "Michelle Gonzales" },
            { "Name": "Jon Abraham" }
        ]
    });
});
server.get('/books', (req, res) => {
    // FETCH THE DATA FROM DB
    // SEND THE DATA 
    res.json({ "Success": "True", "data": "No Books" });
});
server.listen(port, "127.0.0.1", () => {
    console.log(`[server]: Server is running at http://127.0.0.1/:${port}`);
});
