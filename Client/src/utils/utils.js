import { fetchBooksById} from "../api/books";
import { fetchBorrowerById } from "../api/borrowers";

export const validateIsbn = async (isbn) => {
  try {
    const response = await fetchBooksById(isbn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};

export const validateSsn = async (ssn) => {
  try {
    const response = await fetchBorrowerById(ssn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};
