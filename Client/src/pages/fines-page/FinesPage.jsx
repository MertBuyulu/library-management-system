import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectBorrowers } from "../../redux/borrowers";
import { SelectFines } from "../../redux/fines";
import { SelectLoans } from "../../redux/loans";
import { getFines } from "../../redux/fines/fines.utils";

const FinesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFines());
  }, [dispatch]);

  const borrowers = useSelector(SelectBorrowers);
  const fines = useSelector(SelectFines);
  const loans = useSelector(SelectLoans);
  console.log(loans);
  console.log(fines);
  // NOT EVERY EFFICIENT BUT WORKS
  const preparedData = borrowers.map((current_borrower) => {
    // FIND THE LOANS ASSOCIATED WITH THE CURRENT BORROWER USING FILTER
    let borrowers_loans = loans.filter(
      (loan) => loan.card_id !== current_borrower.card_id
    );
    let borrower_fines = [];
    // USING THE LOANS, FIND EACH OF THE FINES ASSOCIATED WITH A SINGLE LOAN
    borrowers_loans.forEach((current_loan) => {
      borrower_fines.push(
        fines.find((fine) => fine.loan_id === current_loan.loan_id)
      );
    });
    return { ...current_borrower, borrower_fines };
  });

  console.log(preparedData);
  return <div>FinesPage</div>;
};

export default FinesPage;
