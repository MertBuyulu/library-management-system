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
import { createBook } from "../../redux/books/books.utils";

const initialAddBookState = {
  isbn: "",
  title: "",
  author: "",
};

const BooksPage = () => {
  // HOOKS & REDUX & STATE MANAGEMENT
  const [modalOpen, setModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [booksAuthorsData, setBookAuthorsData] = useState({});
  const dispatch = useDispatch();
  const books = useSelector(SelectBooksWithKeys);
  const [state, setState] = useState(initialAddBookState);
  const { isbn, title, author } = state;
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

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchContent(e.target.value);
    if (e.target.value.length > 0) {
      let result = books.filter((bookRow) => {
        if (
          bookRow["title"].toLowerCase().includes(e.target.value.toLowerCase()) ||
          bookRow["isbn"].toLowerCase().includes(e.target.value.toLowerCase())
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
    setState({ ...initialAddBookState });
  };



  const onBookAddSubmit = async (e) => {
    e.preventDefault();
    // CHECK FOR VALID ISBN NUMBER

    // CHECK FOR VALID AUTHOR

    // CHECK FOR CORRECT BOOK TITLE

    // NOTIFICATION

    // DEFINE BOOK
    const book = {
      title: title,
      isbn: isbn
    }

    dispatch(createBook(book))

    // const author = {
    //   // id

    // }
    message.success("Added" + title + " by " + author, 2);

    // const bookAuthor = {

    // }


    // CLOSE MODAL
    toggleModal();

    // RESET THE STATE
    setState({ ...initialAddBookState });
  };

  return (
    <div className="books-page">
      <input onChange={handleSearchChange} placeholder={"Search ISBN, Title, Author"} className="border border-transparent block mb-4 p-4 pl-4 text-lg text-gray-900 rounded-lg bg-gray-200 dark:text-white" />

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
        <form onSubmit={onBookAddSubmit}>
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
