import { fetchBorrowerBySsn } from "../api/borrowers";

export const validateSsn = async (ssn) => {
  try {
    const response = await fetchBorrowerBySsn(ssn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};
