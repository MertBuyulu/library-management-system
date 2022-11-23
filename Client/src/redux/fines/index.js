import { createSlice, createSelector } from "@reduxjs/toolkit";
// reducer functions
import { getFines, createFine, updateFine, deleteFine } from "./fines.utils";

const INITIAL_STATE = { fines: [], loading: false, error: "" };

const FinesSlice = createSlice({
  name: "fines",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = action.payload;
      })
      .addCase(getFines.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while fetching all fines...";
      })
      .addCase(createFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = [...state.fines, action.payload];
      })
      .addCase(createFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while creating a new fines...";
      })
      .addCase(updateFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.map((fine) =>
          fine.loan_id === action.payload.loan_id ? action.payload : fine
        );
      })
      .addCase(updateFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while updating a fines...";
      })
      .addCase(deleteFine.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFine.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.filter(
          (fine) => fine.loan_id !== action.payload.loan_id
        );
      })
      .addCase(deleteFine.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Something went wrong while deleting a fines...";
      });
  },
});

export const SelectFines = (state) => state.fines.fines;

export const SelectFineCount = createSelector([SelectFines], (fines) =>
  fines.reduce((accumulator) => accumulator + 1, 0)
);

export const SelectFinesById = (loan_id) =>
  createSelector([SelectFines], (fines) =>
    fines.filter((fine) => fine.loan_id !== loan_id)
  );

// return the fine amount associated with a particular loan_id
export const SelectFineAmountById = (loan_id) =>
  createSelector([SelectFinesById(loan_id)], (fine) => fine.fine_amout);

export default FinesSlice.reducer;
