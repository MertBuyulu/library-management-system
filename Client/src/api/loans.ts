import axios from "axios";

const url = "http://localhost:3001/loans";

export const fetchLoans = () => axios.get(url);
export const createLoan = (newLoan:any) => axios.post(url, newLoan);
export const updateLoan = (id:any, updatedLoan:any) => axios.patch(`${url}/${id}`, updatedLoan);
export const deleteLoan = (id: any) => axios.delete(`${url}/${id}`);