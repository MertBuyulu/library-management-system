/*
This file will load all of the authors into the database with unique id's.

model authors {
  author_id    String        @id @db.VarChar
  name         String        @db.VarChar
  book_authors book_authors?
}

model book_authors {
  author_id String  @id @db.VarChar
  isbn      String  @db.VarChar
  authors   authors @relation(fields: [author_id], references: [author_id], onDelete: NoAction, onUpdate: NoAction)
  book      book    @relation(fields: [isbn], references: [isbn], onDelete: NoAction, onUpdate: NoAction)
}

*/
import { v4 as uuidv4 } from 'uuid';
import {PrismaClient}  from '@prisma/client'
const prisma = new PrismaClient()


// FUNCTION WILL GET THE CORRECT BORROWER FROM THE RAW BORROWER RECORD (CSV)
const getCorrectAuthor = (rawBookRecord) => {
    // DEFINE UNIQUE ID FOR AUTHOR
    var author_id = uuidv4();

    // USING ISBN10 FOR CORRECT AuthorS
    var newAuthor = {
        author_id: author_id,
        name: rawBookRecord.Author,
        book_authors: {
            create: {
                isbn: rawBookRecord.ISBN10
            }
        }

    }
    return newAuthor
}

// FUNCTION WILL RETURN A NEW LIST OF ALL OF THE RECORDS TO ADD TO THE DATABASE
const getCorrectAuthorList = (rawBookRecords) => {
    // CREATE NEW ARRAY OF CORRECT Author RECORDS 
    var authorArray = Array.from(rawBookRecords, (rawBookRecord) => getCorrectAuthor(rawBookRecord))
    return authorArray
}

// FUNCTION WILL ADD ALL Authors and populate the one-on-one 
export const addAllAuthors = async (rawBookRecords) => {

    // GET LIST OF AUTHORS TO ADD
    const correctAuthorList = getCorrectAuthorList(rawBookRecords)

    var numAdded = 0

    // // RUN CREATE ON EACH OF THESE ITEMS
    // for(var i=0; i< correctAuthorList.length; i++){
    //     var author = correctAuthorList[i]
    //     await prisma.authors.create({data: author});
    //     console.log("Adding a new author: " + author.name)
    //     numAdded += 1 
    // }

    correctAuthorList.map(async (author) => {
        await prisma.authors.create({data: author})
        console.log("Added " + author.name)
    }
    
    )
    console.log("Added " + numAdded + " Authors")
}



