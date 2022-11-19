import axios from "axios";

const url = "http://localhost:3001/fines";

export const fetchFines = () => axios.get(url);
export const createFine = (newFine:any) => axios.post(url, newFine);
export const updateFine = (id:any, updatedFine:any) => axios.patch(`${url}/${id}`, updatedFine);
export const deleteFine = (id: any) => axios.delete(`${url}/${id}`);