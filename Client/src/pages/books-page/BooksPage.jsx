import React, { useEffect, useState } from "react";
// styles
import "./BooksPage.styles.scss";
// components
import { Drawer, message, Modal } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";

// api

// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBookssWithKeys } from "../../redux/books/index";
import { SelectAuthorById } from "../../redux/authors";
// validation
import { validateIsbn } from "../../utils/utils";
import Search from "../../components/Search";
import { fetchBookAuthors } from "../../api/bookAuthors";
import BooksTable from "./BooksTable";

const initialState = {
  isbn: "",
  title: "",
  author: "",
};

const BooksPage = () => {
  // hooks
  const [modalOpen, setModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [booksAuthorsData, setBookAuthorsData] = useState({})
  
    // IMPLEMENT USE EFFECT ON BOOK AUTHORS
    // WHY: Can't store BookAuthors in local storage due max
    // useEffect(() => {return (
    //   setBookAuthorsData(fetchBookAuthors())
    // )}, [])

  // redux  
  const dispatch = useDispatch();
  const books = useSelector(SelectBookssWithKeys);
  const [state, setState] = useState(initialState);
  const { isbn, title, author } = state;

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSearchChange = (search) => {
    console.log(search)
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const onCancel = (e) => {
    toggleModal();
    setState({ ...initialState });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // CHECK FOR VALID ISBN NUMBER

    // CHECK FOR VALID AUTHOR

    // CHECK FOR CORRECT BOOK TITLE

    // NOTIFICATION
    message.info("Adding "+ title + " by "+author, 1)

    // CLOSE MODAL
    toggleModal();

    // RESET THE STATE
    setState({ ...initialState });
  };


  const columns = [
    { heading: "ISBN", value: "isbn", key: 1 },
    { heading: "Title", value: "title", key: 2 },
    // { heading: "Author", value: "author", key: 3 },
  ];

  return (
    <div className="books-page">
      <div className={"flex flex-col space-y-1"}>
        <div className={"justify-center content-center"}>
        {/* <Search onChange={handleSearchChange} /> */}
        </div>
        <CustomButton
          onClick={() => {
            toggleModal()
          }}
        >
          {" "}
          Add Book
        </CustomButton>
        <BooksTable books={books} />
      </div>
      <Drawer
      title="Add Book" placement="right" onClose={toggleModal} open={modalOpen}
      >
         <form onSubmit={onSubmit}>
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
            <div className="flex justify-between">
              <CustomButton>Submit</CustomButton>
              <CustomButton onClick={onCancel}>CANCEL</CustomButton>
            </div>
          </form>
      </Drawer>
    </div>
  );
};
export default BooksPage;
