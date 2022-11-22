import React from "react";
// componenents
import Table from "../components/table/Table.component";
// redux
import { useSelector } from "react-redux";
import { SelectLoans } from "../redux/loans";

const LoansPage = () => {
  const loans = useSelector(SelectLoans);

  const columns = [
    { heading: "Loan ID", value: "loan_id", key: 1 },
    { heading: "ISBN", value: "isbn", key: 2 },
    { heading: "Borrower ID", value: "card_id", key: 3 },
    { heading: "Check-out Date", value: "date_out", key: 4 },
    { heading: "Due Date", value: "date_due", key: 5 },
    { heading: "Check-in Date", value: "date_in", key: 6 },
  ];
  return (
    <div className="text-center">
      <Table data={loans} columns={columns}></Table>
    </div>
  );
};

export default LoansPage;
