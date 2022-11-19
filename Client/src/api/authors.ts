import axios from "axios";

const url = "http://localhost:3001/authors";

export const fetchAuthors = () => axios.get(url);
export const createAuthor = (newAuthor:any) => axios.post(url, newAuthor);
export const updateAuthor = (id:any, updatedAuthor:any) => axios.patch(`${url}/${id}`, updatedAuthor);
export const deleteAuthor = (id: any) => axios.delete(`${url}/${id}`);