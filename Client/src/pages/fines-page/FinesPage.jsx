import React, { useState, useRef, useEffect } from "react";
// components
import { Table, Tag } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBorrowersWithKeys } from "../../redux/borrowers";
import { SelectFines, filter as FilterFines } from "../../redux/fines";
import { SelectLoans } from "../../redux/loans";
import { getFines } from "../../redux/fines/fines.utils";

// validation method
import { validatePayment, validatMultiplePayments } from "../../utils/utils";

const FinesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFines());
  }, [dispatch]);

  const borrowers = useSelector(SelectBorrowersWithKeys);
  const fines = useSelector(SelectFines);
  const loans = useSelector(SelectLoans);

  const [filtered, setFiltered] = useState(false);

  const outerTableData = borrowers.map((current_borrower) => {
    // FIND THE LOANS ASSOCIATED WITH THE CURRENT BORROWER USING FILTER
    const borrower_loans = loans.filter(
      (loan) => loan.card_id === current_borrower.card_id
    );
    let borrower_fines = [];
    // USING THE LOANS, FIND EACH OF THE FINES ASSOCIATED WITH A SINGLE LOAN
    borrower_loans.forEach((current_loan, index) => {
      const fine = fines.find((fine) => fine.loan_id === current_loan.loan_id);

      if (fine) borrower_fines.push({ ...fine, key: index + 1 });
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

  const handleSinglePayment = async ({ loan_id }) => {
    if (await validatePayment(loan_id)) {
      alert("SUCCESS!!!");
    } else {
      alert("FAILUREEE!!!");
    }
  };

  const handleMultiplePayment = async ({ borrower_fines }) => {
    const loan_ids = borrower_fines.map((fine) => {
      return fine.loan_id;
    });
    if (await validatMultiplePayments(loan_ids)) {
      alert("SUCCESS!!!");
    } else {
      alert("FAILUREEE!!!");
    }
  };

  const handleTableRefresh = () => {
    console.log("table is refreshed!!");
  };

  const handleFiltering = () => {
    dispatch(FilterFines());
    setFiltered(true);
  };

  const handleReset = () => {
    dispatch(getFines());
    setFiltered(false);
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
        {!filtered ? (
          <CustomButton onClick={handleFiltering}>
            Filter Paid Fines
          </CustomButton>
        ) : (
          <CustomButton onClick={handleReset}>Reset</CustomButton>
        )}
        <CustomButton onClick={handleTableRefresh}>Refresh Fines</CustomButton>
      </div>
      <Table
        pagination={{
          position: ["bottomCenter"],
        }}
        rowKey={(record) => record.card_id}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: false,
          rowExpandable: (record) => record.borrower_fines.length,
        }}
        columns={columns}
        dataSource={outerTableData}
      />
    </div>
  );
};

export default FinesPage;
