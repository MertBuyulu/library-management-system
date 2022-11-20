import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// reducer functions
import {getBorrowers, createBorrower, updateBorrower, deleteBorrower} from "./borrowers.utils"

type Borrower = {
    _id: string,
    ssn: string,
    name: string,
    address: string,
    phone: string
}

interface BorrowersState{
    borrowers: Borrower[],
    loading: boolean,
    error: string
}

const initialState: BorrowersState = {
    borrowers: [],
    loading: false,
    error: ''
}

const BorrowersSlice = createSlice({
    name: 'borrowers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBorrowers.pending, (state) => {
            state.loading = true
        })
        .addCase(getBorrowers.fulfilled, (state, action: PayloadAction<Borrower[]>) => {
            state.loading = false
            state.borrowers = action.payload;
        })
        .addCase(getBorrowers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while fetching all borrowers..."
        })
        .addCase(createBorrower.pending, (state) => {
            state.loading = true;
        })
        .addCase(createBorrower.fulfilled, (state, action: PayloadAction<Borrower>) => {
            state.loading = false
            state.borrowers = [...state.borrowers, action.payload];
        })
        .addCase(createBorrower.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while creating a new borrower...";
        })
        .addCase(updateBorrower.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateBorrower.fulfilled, (state, action: PayloadAction<Borrower>) => {
            state.loading = false
            state.borrowers = state.borrowers.map((borrower) => borrower._id === action.payload._id ? action.payload : borrower)
        })
        .addCase(updateBorrower.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while updating a borrower...";
        })
        .addCase(deleteBorrower.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteBorrower.fulfilled, (state, action: PayloadAction<{_id: string}>) => {
            state.loading = false
            state.borrowers = state.borrowers.filter((borrower) => borrower._id !== action.payload._id);
        })
        .addCase(deleteBorrower.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while deleting a borrower...";
        })
    }
});

export const SelectBorrowers = (state: RootState) => state.borrowers.borrowers

export const SelectBorrowerCount = createSelector([SelectBorrowers], (borrowers) => {
    return borrowers.reduce(accumulator => accumulator + 1, 0)
})

export const SelectBookById = (_id: string) =>
    createSelector([SelectBorrowers], (borrowers) => 
        _id? borrowers.find((borrower) => borrower._id === _id) : null
    )

export default BorrowersSlice.reducer