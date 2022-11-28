import React from "react";
// components
import { Table, Tag } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";

const BooksTable = ({ books, startCheckOut, isBookAvailable }) => {
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
      // render: async (_, { isbn, title }) =>
      //   (await isBookAvailable(isbn, title)) ? <span>S</span> : <span>F</span>,
      render: (_, record) => <span>Temp</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 5,
      align: "center",
      render: (_, record) => (
        <CustomButton onClick={startCheckOut} small>
          CHECK OUT
        </CustomButton>
      ),
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
