DROP TABLE BOOK_LOANS;

CREATE TABLE BOOK_LOANS (
    "LOAN_ID" VARCHAR PRIMARY KEY,
    "ISBN" VARCHAR NOT NULL,
    FOREIGN KEY ("ISBN") REFERENCES book("isbn"),
    "card_id" INTEGER NOT NULL,
    FOREIGN KEY ("card_id") REFERENCES Borrower("Card_id"),
    "date_out" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "date_in" DATE NOT NULL
);