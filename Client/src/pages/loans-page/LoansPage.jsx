import React from "react";
// componenents
import { Table } from "antd";
// redux
import { useSelector } from "react-redux";
import { SelectLoansWithKeys } from "../../redux/loans";

const LoansPage = () => {
  const loans = useSelector(SelectLoansWithKeys);

  const columns = [
    { title: "Loan ID", dataIndex: "loan_id", key: 1 },
    { title: "ISBN", dataIndex: "isbn", key: 2 },
    { title: "Borrower ID", dataIndex: "card_id", key: 3 },
    { title: "Check-out Date", dataIndex: "date_out", key: 4 },
    { title: "Due Date", dataIndex: "date_due", key: 5 },
    { title: "Check-in Date", dataIndex: "date_in", key: 6 },
  ];
  return (
    <div>
      <Table dataSource={loans} columns={columns}></Table>
    </div>
  );
};

export default LoansPage;
