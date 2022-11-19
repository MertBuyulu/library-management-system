import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// reducer functions
import {getBooks, createBook, updateBook, deleteBook} from "./books.utils"

type Book = {
    isbn: string,
    title: string,
}

interface BooksState{
    books: Book[],
    loading: boolean,
    error: string
}

const initialState: BooksState = {
    books: [],
    loading: false,
    error: ''
}

const BooksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBooks.pending, (state) => {
            state.loading = true
        })
        .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
            state.loading = false
            state.books = action.payload;
        })
        .addCase(getBooks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while fetching all books..."
        })
        .addCase(createBook.pending, (state) => {
            state.loading = true;
        })
        .addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
            state.loading = false
            state.books = [...state.books, action.payload];
        })
        .addCase(createBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while creating a new book...";
        })
        .addCase(updateBook.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
            state.loading = false
            state.books = state.books.map((book) => book.isbn === action.payload.isbn ? action.payload : book)
        })
        .addCase(updateBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while updating a book...";
        })
        .addCase(deleteBook.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteBook.fulfilled, (state, action: PayloadAction<{isbn: string}>) => {
            state.loading = false
            state.books = state.books.filter((book) => book.isbn !== action.payload.isbn);
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while deleting a book...";
        })
    }
});

export const SelectBooks = (state: RootState) => state.books.books

export const SelectBookCount = createSelector([SelectBooks], (books) => {
    return books.reduce(accumulator => accumulator + 1, 0)
})

export const SelectBookById = (isbn: string) =>
    createSelector([SelectBooks], (books) => 
        isbn? books.find((book) => book.isbn === isbn) : null
    )

export default BooksSlice.reducer