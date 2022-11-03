"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// https://blog.logrocket.com/how-to-set-up-node-typescript-express/
var express_1 = __importDefault(require("express"));
var book_service_1 = require("./src/services/book.service");
var port = 3001;
var server = (0, express_1["default"])();
server.get('/api/v1/', function (req, res) {
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
server.get('/api/v1/book', function (req, res) { return book_service_1.BookService.getAllBooks(req, res); });
server.listen(port, "127.0.0.1", function () {
    console.log("[server] Server is running at http://127.0.0.1:".concat(port, "/api/v1"));
});
//# sourceMappingURL=index.js.map