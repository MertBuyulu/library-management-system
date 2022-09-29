-- create table book authors
-- Boolean
-- Character Types [ such as char, varchar, and text]
-- Numeric Types [ such as integer and floating-point number]
-- Temporal Types [ such as date, time, timestamp, and interval]
-- UUID [ for storing UUID (Universally Unique Identifiers) ]
-- Array [ for storing array strings, numbers, etc.]
-- JSON [ stores JSON data]
-- hstore [ stores key-value pair]
-- Special Types [ such as network address and geometric data]
SELECT * FROM "BOOK_AUTHORS";
-- remove everything from table
DELETE FROM BOOK_AUTHORS;
-- remove the table
DROP TABLE "BOOK_AUTHORS";

CREATE TABLE "BOOK_AUTHORS" 
(
    "AUTHOR_ID" VARCHAR PRIMARY KEY,
    Isbn VARCHAR NOT NULL,
    FOREIGN KEY (Isbn) REFERENCES Book(Isbn),
    FOREIGN KEY ("AUTHOR_ID") REFERENCES Authors("AUTHOR_ID")
);

SELECT * FROM "BOOK_AUTHORS";