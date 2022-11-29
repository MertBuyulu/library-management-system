import React, { useEffect, useState } from "react";
// components
import { Table, Tag, Skeleton } from "antd";
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
      render: (_, record) => {
        return (
          // record.book_authors[0].authors.name
          record.book_authors.map((bookAuthorObj, key) => {
            return key === 0
              ? "" + bookAuthorObj.authors.name + " "
              : ", " + bookAuthorObj.authors.name + "";
          })
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 4,
      align: "center",
      render: (_, record) => (
        <StatusCell record={record} isBookAvailable={isBookAvailable} />
      ),
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

const StatusCell = ({ isBookAvailable, record }) => {
  const [statusData, setStatusData] = useState(false);
  useEffect(() => {
    const getStatus = async (record) => {
      const res = await isBookAvailable(record.isbn);
      setStatusData(res);
    };
    getStatus(record);
  }, [isBookAvailable, record]);

  return statusData ? (
    <Tag color="green">AVAILABLE</Tag>
  ) : (
    <Tag color="volcano">NOT AVAILABLE</Tag>
  );
};

export default BooksTable;
