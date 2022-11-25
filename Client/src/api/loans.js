import axios from "axios";

const url = "http://localhost:3001/bookLoans";

export const fetchLoans = () => axios.get(url);
export const createLoan = (newLoan) => axios.post(url, newLoan);
export const updateLoan = (loan_id, updatedLoan) =>
  axios.put(`${url}/${loan_id}`, updatedLoan);
export const updateLoans = (updatedLoans) => axios.put(`${url}`, updatedLoans);
export const deleteLoan = (id) => axios.delete(`${url}/${id}`);
