import { createSlice, createSelector } from "@reduxjs/toolkit";
// reducer functions
import { getLoans, createLoan, updateLoan, deleteLoan } from "./loans.utils";

const INITIAL_STATE = { loans: [], loading: false, error: "" };

const LoansSlice = createSlice({
  name: "loans",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
      })
      .addCase(getLoans.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while fetching all loan...";
      })
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = [...state.loans, action.payload];
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new loan...";
      })
      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.map((loan) =>
          loan._id === action.payload._id ? action.payload : loan
        );
      })
      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a loan...";
      })
      .addCase(deleteLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = state.loans.filter(
          (loan) => loan._id !== action.payload._id
        );
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a loan...";
      });
  },
});

export const SelectLoans = (state) => state.loans.loans;

export const SelectLoanCount = createSelector([SelectLoans], (loans) =>
  loans.reduce((accumulator) => accumulator + 1, 0)
);

export const SelectLoansWithKeys = createSelector([SelectLoans], (loans) =>
  loans.map((loan, index) => {
    return { ...loan, key: index + 1 };
  })
);

export const SelectLoanById = (loan_id) =>
  createSelector([SelectLoans], (loans) =>
    loan_id ? loans.find((loan) => loan._id === loan_id) : null
  );

export default LoansSlice.reducer;
