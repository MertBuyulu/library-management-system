import React from "react";
// components
import { Table } from "antd";

// const columns = [
//     {
//         title: "Loan ID",
//         dataIndex: "loan_id",
//         key: 1,
//         align: "center",
//         width: 150,
//         ...getColumnSearchProps("loan_id"),
//     },
//     { title: "ISBN", dataIndex: "isbn", key: 2, align: "center", width: 150 },
//     {
//         title: "Borrower Name",
//         dataIndex: "bname",
//         key: 3,
//         align: "center",
//         width: 150,
//         ...getColumnSearchProps("bname"),
//     },
//     {
//         title: "Borrower ID",
//         dataIndex: "card_id",
//         key: 4,
//         align: "center",
//         width: 150,
//         ...getColumnSearchProps("card_id"),
//     },
//     {
//         title: "Check-out Date",
//         dataIndex: "date_out",
//         key: 5,
//         align: "center",
//         width: 150,
//     },
//     {
//         title: "Due Date",
//         dataIndex: "due_date",
//         key: 6,
//         align: "center",
//         width: 150,
//     },
//     {
//         title: "Check-in Date",
//         dataIndex: "date_in",
//         key: 7,
//         align: "center",
//         width: 150,
//     },
//     {
//         title: "Action",
//         dataIndex: "action",
//         key: 8,
//         align: "center",
//         width: 150,
//         // CONDITIONALLY RENDER BUTTON
//         render: (_, record) => (
//             // !record.date_in ? (
//             <CustomButton onClick={() => handleSingleCheckIn(record)} small>
//                 Check in now
//             </CustomButton>
//         ),
//         // ) : (
//         //   <CustomButton flag={true} small>
//         //     Checked in
//         //   </CustomButton>
//         // ),
//     },
// ];

const columns = [
  {
    title: "ISBN",
    dataIndex: "isbn",
    key: 1,
    align: "center",
  },
  { title: "Title", dataIndex: "title", key: 2 },
  {
    title: "Authors",
    dataIndex: "authors",
    key: 3,
    align: "center",
  },
];

const BooksTable = (props) => {
  const { books } = props;
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => setSelectedRowKeys(e),
    // "2022-11-24T00:00:00.000Z" IS BEING USED FOR TESTING PURPOSES ONLY
    // getCheckboxProps: (record) => {
    //   if (record.date_in > "2022-11-24T00:00:00.000Z")
    //     return {
    //       disabled: true,
    //     };
    // },
  };

  return (
    <Table
      dataSource={books}
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
      }}
      rowSelection={rowSelection}
    />
  );
};

export default BooksTable;
