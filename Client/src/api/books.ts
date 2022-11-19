import axios from "axios";

const url = "http://localhost:3001/books";

// you can export this as well
// export type Book = {
//     isbn: string,
//     title: string
// }

export const fetchBooks = () => axios.get(url);
export const createBook = (newBook:any) => axios.post(url, newBook);
export const updateBook = (id:any, updatedBook:any) => axios.patch(`${url}/${id}`, updatedBook);
export const deleteBook = (id: any) => axios.delete(`${url}/${id}`);



