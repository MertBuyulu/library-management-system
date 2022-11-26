import React, { useState } from "react";
// styles
import "./BooksPage.styles.scss";
// components
import { message, Modal } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import Table from "../../components/table/Table.component";
// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBookssWithKeys } from "../../redux/books/index";
import { SelectAuthorById } from "../../redux/authors";
// validation
import { validateIsbn } from "../../utils/utils";
import Search from "../../components/Search";

const initialState = {
  isbn: "",
  title: "",
  author: "",
};

const BooksPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const books = useSelector(SelectBookssWithKeys);
  const [state, setState] = useState(initialState);

  const { isbn, title, author } = state;

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (isbn) => (e) => {
    // e.preventDefault();
    // if (!validateIsbn(isbn))
    //   //dispatch(createBook({ isbn, title, author }));
    //   alert("ISBN you entered is valid!!");
    // else
    //   alert("ISBN you entered is already in use. Please enter a unique ssn.");
    // // reset the state
    // setState({ ...initialState });
  };

  const columns = [
    { heading: "ISBN", value: "isbn", key: 1 },
    { heading: "Title", value: "title", key: 2 },
    { heading: "Author", value: "author", key: 3 },
  ];

  return (
    <div className="books-page">
      <div className={"flex flex-col space-y-1"}>
        {/* <Search onChange={(content) => {}} /> */}
        <CustomButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {" "}
          Add Book
        </CustomButton>
        <div className="book-table">
          {/* <Table data={books} columns={columns} /> */}
        </div>
      </div>
      <Modal
        title="Add Book"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        footer={[<CustomButton>Submit</CustomButton>]}
      >
        <div className="book-form">
          <form onSubmit={onSubmit(isbn)}>
            <FormInput
              name="isbn"
              type="text"
              label="ISBN"
              value={isbn}
              onChange={onChange}
              required
            />
            <FormInput
              name="title"
              type="text"
              label="Book Title"
              value={title}
              onChange={onChange}
              required
            />
            <FormInput
              name="author"
              type="text"
              label="Author"
              value={author}
              onChange={onChange}
              required
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default BooksPage;
