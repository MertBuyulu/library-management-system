import React from "react";
// redux
import { useSelector } from "react-redux";
import { SelectLoans } from "../redux/loans";

const LoansPage = () => {
  const loans = useSelector(SelectLoans);
  return <div>LoansPage</div>;
};

export default LoansPage;
