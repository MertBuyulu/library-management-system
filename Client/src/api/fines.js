import axios from "axios";

const url = "http://localhost:3001/fines";

export const fetchFines = () => axios.get(url);
export const createFine = (newFine) => axios.post(url, newFine);
export const updateFine = (id, updatedFine) =>
  axios.patch(`${url}/${id}`, updatedFine);
export const deleteFine = (id) => axios.delete(`${url}/${id}`);
export const refreshFines = () => axios.patch(url);
