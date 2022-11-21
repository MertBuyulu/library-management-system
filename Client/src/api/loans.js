import axios from "axios";

const url = "http://localhost:3001/loans";

export const fetchLoans = () => axios.get(url);
export const createLoan = (newLoan) => axios.post(url, newLoan);
export const updateLoan = (id, updatedLoan) =>
  axios.patch(`${url}/${id}`, updatedLoan);
export const deleteLoan = (id) => axios.delete(`${url}/${id}`);
