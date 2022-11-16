import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import 'mocha';
import { server } from "../index"
import { getBook, createBook, getAllBooks, updateBook, deleteBook } from "../src/services/book.service"


chai.use(chaiHttp)

type Book = {
    isbn: string
    title: string
}

// DEFINE A SAMPLE BOOK
const testBook: Book = {
    isbn: "0123456789",
    title: "TestBook"
}

console.log("[TESTING] Testing Book Services")

describe("/POST book", () => {
    it("This test will create a new sample book.", () => {
        chai.request(server)
            .post("/book")
            .send(testBook)
            .end((err, res) => { expect(res).to.have.status(res.status).equal(200) })
    })
})