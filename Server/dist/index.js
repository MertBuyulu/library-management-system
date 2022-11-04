"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
<<<<<<< Updated upstream
var express_1 = __importDefault(require("express"));
var book_service_1 = require("./src/services/book.service");
var port = 3001;
var server = (0, express_1["default"])();
server.get('/', function (req, res) {
=======
const express_1 = __importDefault(require("express"));
const book_service_1 = require("./src/services/book.service");
const port = 3001;
const server = (0, express_1.default)();
server.get('/', (req, res) => {
>>>>>>> Stashed changes
    res.json({
        "Success": "True",
        "Team": "Beryllium",
        "Team Members": [
            { "Name": "Mert Buyulu" },
<<<<<<< Updated upstream
            { "Name": "Minh Nguyen", "Role": "Front-End Dev" },
=======
            { "Name": "Minh Nguyen", "Role": "front-endDev" },
>>>>>>> Stashed changes
            { "Name": "Srilokh Karuturi", "Role": "Lead" },
            { "Name": "Michelle Gonzales", "Role": "Programmer" },
            { "Name": "Jonathan Abraham", "Role": "Team Member" }
        ]
    });
});
<<<<<<< Updated upstream
server.get('/book', function (req, res) { return book_service_1.BookService.getAllBooks(req, res); });
server.listen(port, "127.0.0.1", function () {
    console.log("[server] Server is running at http://127.0.0.1:".concat(port, "/api/v1"));
=======
server.get('/book', (req, res) => book_service_1.BookService.getAllBooks(req, res));
server.listen(port, "127.0.0.1", () => {
    console.log(`[server] Server is running at http://127.0.0.1:${port}/api/v1`);
>>>>>>> Stashed changes
});
//# sourceMappingURL=index.js.map