import * as api from "../../api/fines";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFines = createAsyncThunk("posts/getFines", async () => {
  try {
    const response = await api.fetchFines();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const refreshFines = createAsyncThunk("posts/refreshFines", async () => {
  try {
    const response = await api.refreshFines();
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createFine = createAsyncThunk("posts/createFine", async (loan) => {
  try {
    const response = await api.createFine(loan);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const updateFine = createAsyncThunk(
  "posts/updateFine",
  async (id, fine) => {
    try {
      const response = await api.updateFine(id, fine);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteFine = createAsyncThunk("posts/deleteFine", async (id) => {
  try {
    const response = await api.deleteFine(id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
