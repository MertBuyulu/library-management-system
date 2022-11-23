import React, { useState, useRef } from "react";
// styles
import "./LoansPage.styles.scss";
// componenents
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import CustomButton from "../../components/custom-button/CustomButton.component";
// redux
import { useSelector, useDispatch } from "react-redux";
import { SelectLoansWithKeys } from "../../redux/loans";
import { SelectBorrowers } from "../../redux/borrowers";
import { updateLoan, updateLoans } from "../../redux/loans/loans.utils";

const LoansPage = () => {
  const dispatch = useDispatch();
  const borrowers = useSelector(SelectBorrowers);
  const loans = useSelector(SelectLoansWithKeys);

  const searchInput = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const data = loans.map((loan) => {
    const { bname } = borrowers.find(
      (borrower) => borrower.card_id === loan.card_id
    );
    return {
      ...loan,
      bname: bname,
    };
  });

  const handleSingleCheckIn = (record) => {
    const today = new Date().toISOString().slice(0, 10);
    const updatedLoan = { ...record, date_in: today };

    //dispatch(updateLoan(record.loan_id, updatedLoan))
  };

  const handleMultipleCheckIn = () => {
    // to made batch update to the server
    const updatedLoans = selectedRowKeys.map((key) =>
      loans.find((loan) => loan.key === key)
    );
    //dispatch(updateLoans(updateLoans))
  };

  // to keep track of selected rows
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // to enable search functionality
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // to enable search functionality
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // search logic
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 10,
        }}
        //onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            height: 30,
          }}
        />
        <Space>
          <CustomButton
            extra_small
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
          >
            Search
          </CustomButton>
          <CustomButton
            extra_small
            onClick={() =>
              clearFilters && handleReset(clearFilters, selectedKeys, dataIndex)
            }
          >
            Reset
          </CustomButton>
          <CustomButton
            extra_small
            onClick={() => {
              close();
            }}
          >
            Cancel
          </CustomButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : "#006A4E",
          fontWeight: "bold",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Loan ID",
      dataIndex: "loan_id",
      key: 1,
      align: "center",
      width: 150,
      ...getColumnSearchProps("loan_id"),
    },
    { title: "ISBN", dataIndex: "isbn", key: 2, align: "center", width: 150 },
    {
      title: "Borrower Name",
      dataIndex: "bname",
      key: 3,
      align: "center",
      width: 150,
      ...getColumnSearchProps("bname"),
    },
    {
      title: "Borrower ID",
      dataIndex: "card_id",
      key: 4,
      align: "center",
      width: 150,
      ...getColumnSearchProps("card_id"),
    },
    {
      title: "Check-out Date",
      dataIndex: "date_out",
      key: 5,
      align: "center",
      width: 150,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: 6,
      align: "center",
      width: 150,
    },
    {
      title: "Check-in Date",
      dataIndex: "date_in",
      key: 7,
      align: "center",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 8,
      align: "center",
      width: 150,
      render: (_, record) =>
        loans.length >= 1 && (
          <CustomButton onClick={() => handleSingleCheckIn(record)} small>
            Check in now
          </CustomButton>
        ),
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div className="loans-page">
        <CustomButton onClick={handleMultipleCheckIn}>
          Check in all
        </CustomButton>
        <span>
          {hasSelected ? `Selected ${selectedRowKeys.length} loans` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} dataSource={data} columns={columns} />
    </div>
  );
};

export default LoansPage;
