import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// reducer functions
import {getLoans, createLoan, updateLoan, deleteLoan} from "./loans.utils"

type Loan = {
    _id: string,
    isbn: string,
    card_id: string,
    date_out: string,
    due_date: string,
    date_in: string
}

interface LoansState{
    loans: Loan[],
    loading: boolean,
    error: string
}

const initialState: LoansState = {
    loans: [],
    loading: false,
    error: ''
}

const LoansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getLoans.pending, (state) => {
            state.loading = true
        })
        .addCase(getLoans.fulfilled, (state, action: PayloadAction<Loan[]>) => {
            state.loading = false
            state.loans = action.payload;
        })
        .addCase(getLoans.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while fetching all loan..."
        })
        .addCase(createLoan.pending, (state) => {
            state.loading = true;
        })
        .addCase(createLoan.fulfilled, (state, action: PayloadAction<Loan>) => {
            state.loading = false
            state.loans = [...state.loans, action.payload];
        })
        .addCase(createLoan.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while creating a new loan...";
        })
        .addCase(updateLoan.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateLoan.fulfilled, (state, action: PayloadAction<Loan>) => {
            state.loading = false
            state.loans = state.loans.map((loan) => loan._id === action.payload._id ? action.payload : loan)
        })
        .addCase(updateLoan.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while updating a loan...";
        })
        .addCase(deleteLoan.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteLoan.fulfilled, (state, action: PayloadAction<{_id: string}>) => {
            state.loading = false
            state.loans = state.loans.filter((loan) => loan._id !== action.payload._id);
        })
        .addCase(deleteLoan.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong while deleting a loan...";
        })
    }
});

export const SelectLoans = (state: RootState) => state.loans.loans

export const SelectLoanCount = createSelector([SelectLoans], (loans) => {
    return loans.reduce(accumulator => accumulator + 1, 0)
})

export const SelectLoanById = (_id: string) =>
    createSelector([SelectLoans], (loans) => 
        _id? loans.find((loans) => loans._id === _id) : null
    )

export default LoansSlice.reducer