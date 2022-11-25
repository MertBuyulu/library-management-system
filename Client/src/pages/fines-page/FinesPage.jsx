import React from "react";
// components
import { Table, Tag } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
// redux
import { useSelector } from "react-redux";
import { SelectBorrowersWithKeys } from "../../redux/borrowers";
import { SelectFines } from "../../redux/fines";
import { SelectLoans } from "../../redux/loans";

const FinesPage = () => {
  const borrowers = useSelector(SelectBorrowersWithKeys);
  const fines = useSelector(SelectFines);
  const loans = useSelector(SelectLoans);

  const outerTableData = borrowers.map((current_borrower) => {
    // FIND THE LOANS ASSOCIATED WITH THE CURRENT BORROWER USING FILTER
    let borrower_loans = loans.filter(
      (loan) => loan.card_id === current_borrower.card_id
    );
    let borrower_fines = [];
    // USING THE LOANS, FIND EACH OF THE FINES ASSOCIATED WITH A SINGLE LOAN
    borrower_loans.every((current_loan, index) => {
      const fine = fines.find((fine) => fine.loan_id === current_loan.loan_id);

      if (fine) {
        // CONTINUE WITH THE NEXT ITEM
        borrower_fines.push({ ...fine, key: index + 1 });
        return true;
      } else {
        // BREAK THE LOOP
        return false;
      }
    });

    let total_fine_amount = 0;

    if (borrower_fines.length) {
      total_fine_amount = borrower_fines.reduce(
        (accumulator, { fine_amount }) => accumulator + fine_amount,
        0
      );
    }

    return { ...current_borrower, borrower_fines, total_fine_amount };
  });

  const handleSinglePayment = () => {
    console.log("Success...single payment has proceeded!!");
  };

  const handleMultiplePayment = () => {
    console.log("Success!!");
  };

  const handleTableRefresh = () => {
    console.log("table is refreshed!!");
  };

  const handleFiltering = () => {
    console.log("table is filtered!!");
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Loan ID",
        dataIndex: "loan_id",
        key: 1,
        align: "center",
      },
      {
        title: "Fine Amount",
        dataIndex: "fine_amount",
        key: 2,
        align: "center",
        render: (_, { fine_amount }) => <span>${fine_amount}</span>,
      },
      {
        title: "Status",
        dataIndex: "paid",
        key: 3,
        align: "center",
        render: (_, record) =>
          record.paid ? (
            <Tag color="green">PAID</Tag>
          ) : (
            <Tag color="volcano">NOT PAID</Tag>
          ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: 4,
        align: "center",
        width: 150,
        render: (_, record) => (
          <CustomButton onClick={() => handleSinglePayment(record)} small>
            Pay Fine
          </CustomButton>
        ),
      },
    ];
    return (
      <Table
        rowKey={(record) => record.card_id}
        dataSource={record.borrower_fines}
        columns={columns}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Borrower ID",
      dataIndex: "card_id",
      key: 1,
      align: "center",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "bname",
      key: 2,
      align: "center",
      width: 200,
    },
    {
      title: "SSN",
      dataIndex: "ssn",
      key: 3,
      align: "center",
    },
    {
      title: "Total Fine Amount",
      dataIndex: "total_fine_amount",
      key: 4,
      align: "center",
      render: (_, { total_fine_amount }) => <span>${total_fine_amount}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 5,
      align: "center",
      width: 150,
      render: (_, record) => (
        <CustomButton onClick={() => handleMultiplePayment(record)} small>
          Pay All Fines
        </CustomButton>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <CustomButton>Filter Paid Fines</CustomButton>
        <CustomButton>Refresh Fines</CustomButton>
      </div>
      <Table
        pagination={{
          position: ["bottomCenter"],
        }}
        rowKey={(record) => record.card_id}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: false,
        }}
        columns={columns}
        dataSource={outerTableData}
      />
    </div>
  );
};

export default FinesPage;
