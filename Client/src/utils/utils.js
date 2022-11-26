import { fetchBorrowerBySsn } from "../api/borrowers";
import { fetchLoanById, fetchLoansById } from "../api/loans";

export const validateSsn = async (ssn) => {
  try {
    const response = await fetchBorrowerBySsn(ssn);
    const { data } = response;
    return Object.keys(data).length === 0;
  } catch (error) {
    return error.message;
  }
};

export const validatePayment = async (loan_id) => {
  try {
    const response = await fetchLoanById(loan_id);
    const {
      data: { date_in },
    } = response;
    return date_in !== null || date_in !== undefined;
  } catch (error) {
    return error.message;
  }
};

// PRISMA CLI RETURNS NULL IF THE RECORD IS NOT FOUND.
export const validatMultiplePayments = async (loan_ids) => {
  try {
    const response = await fetchLoansById(loan_ids);
    const { data } = response;
    return Object.keys(data).length;
  } catch (error) {
    return error.message;
  }
};
