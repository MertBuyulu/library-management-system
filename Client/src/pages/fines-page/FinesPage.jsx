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
  // NOT EVERY EFFICIENT BUT WORKS
  const preparedData = borrowers.map((current_borrower) => {
    // FIND THE LOANS ASSOCIATED WITH THE CURRENT BORROWER USING FILTER
    const borrower_loans = loans.filter(
      (loan) => loan.card_id === current_borrower.card_id
    );

    const borrower_fines = [];
    // USING THE LOANS, FIND EACH OF THE FINES ASSOCIATED WITH A SINGLE LOAN
    borrower_loans.forEach((current_loan) => {
      borrower_fines.push(
        fines.find((fine) => fine.loan_id === current_loan.loan_id)
      );
    });
    // FIND TOTAL FINE AMOUNT FOR A PARTICULAR BORROWER
    const total_fine_amount = borrower_fines.reduce(
      (accumulator, { fine_amount }) => accumulator + fine_amount,
      0
    );
    return { ...current_borrower, borrower_fines, total_fine_amount };
  });

  console.log(preparedData);

  return <div>FinesPage</div>;
};

export default FinesPage;
