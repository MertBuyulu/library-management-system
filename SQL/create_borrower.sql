DROP TABLE BORROWER

CREATE TABLE BORROWER (
    "Card_id" INTEGER PRIMARY KEY,
    "SSN" INTEGER NOT NULL,
    "Bname" VARCHAR NOT NULL,
    "Address" VARCHAR NOT NULL,
    "Phone" VARCHAR NOT NULL
);