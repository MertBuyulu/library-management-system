import axios from "axios";

const url = "http://localhost:3001/borrowers";

export const fetchBorrowers = () => axios.get(url);
export const createBorrower = (newBorrower:any) => axios.post(url, newBorrower);
export const updateBorrower = (id:any, updatedBorrower:any) => axios.patch(`${url}/${id}`, updatedBorrower);
export const deleteBorrower = (id: any) => axios.delete(`${url}/${id}`);