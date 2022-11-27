import React from "react";
// components
import { Table } from "antd";
// redux
import { useSelector } from "react-redux";
import { SelectAuthorsWithKeys } from "../../redux/authors/index";

const AuthorsPage = () => {
  const authors = useSelector(SelectAuthorsWithKeys);

  const columns = [
    {
      title: "Author ID",
      dataIndex: "author_id",
      key: 1,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: 2,
      align: "center",
    },
  ];
  return (
    <Table
      pagination={{
        position: ["bottomCenter"],
      }}
      dataSource={authors}
      columns={columns}
    />
  );
};

export default AuthorsPage;
