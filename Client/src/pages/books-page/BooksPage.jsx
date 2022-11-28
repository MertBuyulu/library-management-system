import React, { useEffect, useState } from "react";
// styles
import "./BooksPage.styles.scss";
// components
import { Drawer, message } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import BooksTable from "./BooksTable";
import Search from "../../components/Search";
// api
import { fetchBookAuthors } from "../../api/bookAuthors";
// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBooksWithKeys } from "../../redux/books/index";
// validation
import {
  isBorrowerEligible,
  isBookAvailable,
  validateBorrowerId,
} from "../../utils/utils";

const initialState = {
  isbn: "",
  title: "",
  author: "",
};

const BooksPage = () => {
  // REDUX
  const dispatch = useDispatch();
  const books = useSelector(SelectBooksWithKeys);
  const [state, setState] = useState(initialState);
  const { isbn, title, author } = state;

  // REACT HOOKS
  const [modalOpen, setModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [bookAuthorsData, setBookAuthorsData] = useState([]);

  // DEFINE BOOKS TO DISPLAY
  const [booksDisplayed, setBooksDisplayed] = useState(books);

  // FETCH BOOK AUTHORS TABLE DATA FROM THE SERVER
  useEffect(() => {
    const getBookAuthors = async () => {
      const { data } = await fetchBookAuthors();
      setBookAuthorsData(data);
    };

    getBookAuthors();
  }, []);

  // TODO: CONSTRUCT THE DATA TO BE PRESENTED IN THE TABLE HERE

  const startCheckOut = () => {
    console.log("started checkout process");
  };

  const processCheckOut = () => {
    console.log("continuing with the process");
  };

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchContent(e.target.value);
    if (e.target.value.length > 0) {
      let result = books.filter((bookRow) => {
        if (
          bookRow["title"].includes(e.target.value) ||
          bookRow["isbn"].includes(e.target.value)
        ) {
          return true;
        } else {
          return false;
        }
      });

      setBooksDisplayed(result);
    } else {
      setBooksDisplayed(books);
    }
  };

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
    message.info("Adding " + title + " by " + author, 1);

    // CLOSE MODAL
    toggleModal();

    // RESET THE STATE
    setState({ ...initialState });
  };

  return (
    <div className="books-page">
      <input onChange={handleChange} />

      {/* <Search searchContent={searchContent} /> */}
      <CustomButton
        onClick={() => {
          toggleModal();
        }}
      >
        {" "}
        Add Book
      </CustomButton>
      <BooksTable
        books={booksDisplayed}
        startCheckOut={startCheckOut}
        isBookAvailable={isBookAvailable}
      />
      <Drawer
        title="Add Book"
        placement="right"
        onClose={toggleModal}
        open={modalOpen}
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
