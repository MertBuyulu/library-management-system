import React from "react";
// components
import { Table, Tag } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";

const BooksTable = ({ books, startCheckout, isBookAvailable }) => {
  const columns = [
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: 1,
      align: "center",
    },
    { title: "Title", dataIndex: "title", key: 2 },
    // WILL BE DISPLAYED AS A LIST SEPERATED BY COMMAS
    {
      title: "Authors",
      dataIndex: "authors",
      key: 3,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 4,
      align: "center",
      render: (_, record) => {
        return isBookAvailable(record.isbn, record.title) ? (
          <span>Available</span>
        ) : (
          <span>Not Available</span>
        );
      },
      // render: (_, record) => <span>Temp</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 5,
      align: "center",
      render: (_, record) => {
        return (
          <CustomButton
            onClick={() =>
              startCheckout(record.isbn, record.authors, record.title)
            }
            small
          >
            CHECK OUT
          </CustomButton>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={books}
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  );
};

export default BooksTable;
