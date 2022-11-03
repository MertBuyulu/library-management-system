/*
This file will load all of the data from a prisma postgres db.
*/
import csvtojson from 'csvtojson'
import {PrismaClient}  from '@prisma/client'
const prisma = new PrismaClient()
const {csv} = csvtojson;

// LOAD BOOKS AND BORROWERS OBJECT
var books = await csv().fromFile("books.csv")
var borrowers = await csv().fromFile("borrowers.csv")

console.log(books[0])