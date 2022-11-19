import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// reducer functions
import {getFines, createFine, updateFine, deleteFine} from "./fines.utils"

type Fine = {
    loan_id: string,
    fine_amt: number,
    paid: boolean
}

interface LoansState{
    fines: Fine[],
    loading: boolean,
    error: string
}

const initialState: LoansState = {
    fines: [],
    loading: false,
    error: ''
}

const FinesSlice = createSlice({
    name: 'fines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFines.pending, (state) => {
            state.loading = true
        })
        .addCase(getFines.fulfilled, (state, action: PayloadAction<Fine[]>) => {
            state.loading = false
            state.fines = action.payload;
        })
        .addCase(getFines.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while fetching all loan..."
        })
        .addCase(createFine.pending, (state) => {
            state.loading = true;
        })
        .addCase(createFine.fulfilled, (state, action: PayloadAction<Fine>) => {
            state.loading = false
            state.fines = [...state.fines, action.payload];
        })
        .addCase(createFine.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while creating a new loan...";
        })
        .addCase(updateFine.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateFine.fulfilled, (state, action: PayloadAction<Fine>) => {
            state.loading = false
            state.fines = state.fines.map((fine) => fine.loan_id === action.payload.loan_id ? action.payload : fine)
        })
        .addCase(updateFine.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while updating a loan...";
        })
        .addCase(deleteFine.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteFine.fulfilled, (state, action: PayloadAction<{loan_id: string}>) => {
            state.loading = false
            state.fines = state.fines.filter((fine) => fine.loan_id !== action.payload.loan_id);
        })
        .addCase(deleteFine.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while deleting a loan...";
        })
    }
});

export const SelectFines = (state: RootState) => state.fines.fines

export const SelectFineCount = createSelector([SelectFines], (fines) => {
    return fines.reduce(accumulator => accumulator + 1, 0)
})

export const SelectFineById = (loan_id: string) =>
    createSelector([SelectFines], (fines) => 
        loan_id? fines.find((fine) => fine.loan_id === loan_id) : null
    )

export default FinesSlice.reducer