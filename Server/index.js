"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
const express_1 = __importDefault(require("express"));
const book_service_1 = require("./src/services/book.service");
const port = 3001;
const server = (0, express_1.default)();
server.get('/', (req, res) => {
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
    });
});
server.get('/book', (req, res) => book_service_1.BookService.getAllBooks(req, res));
server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/`);
});
