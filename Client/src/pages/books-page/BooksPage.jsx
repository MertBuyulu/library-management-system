import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// styles
import "./BooksPage.styles.scss";

// components
import { Drawer, message } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import BooksTable from "./BooksTable";

// api
import { fetchBookAuthors } from "../../api/bookAuthors";

// redux
import { useDispatch, useSelector } from "react-redux";
import { SelectBooksWithKeys } from "../../redux/books/index";
import { createBook } from "../../redux/books/books.utils";
import { createAuthor } from "../../redux/authors/authors.utils";
import { createBookAuthor } from "../../redux/bookAuthors/book_authors.utils";

// validation
import {
  isBorrowerEligible,
  isBookAvailable,
  validateBorrowerID,
} from "../../utils/utils";
import { createLoan } from "../../redux/loans/loans.utils";

const initialAddBookState = {
  isbn: "",
  title: "",
  author: "",
};

const initialBookCheckoutState = {
  isbn: "",
  title: "",
  card_id: "",
};

const BooksPage = () => {
  // HOOKS & REDUX & STATE MANAGEMENT
  const [bookCreationModalOpen, setBookCreationModalOpen] = useState(false);
  const [bookCheckoutModalOpen, setBookCheckoutModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [booksAuthorsData, setBookAuthorsData] = useState({});
  const dispatch = useDispatch();
  const books = useSelector(SelectBooksWithKeys);
  const [bookAddState, setBookAddState] = useState(initialAddBookState);
  const [bookCheckoutState, setBookCheckoutState] = useState(
    initialBookCheckoutState
  );
  const { isbn, title, author } = bookAddState;
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

  const startCheckout = (isbn, authors, title) => {
    setBookCheckoutState({ ...bookCheckoutState, isbn: isbn, title: title });
    toggleBookCheckoutModal();
  };

  const onHandleCheckout = async (e) => {
    e.preventDefault();
    if (await validateBorrowerID(bookCheckoutState.card_id)) {
      successBorrowerID();
      if (await isBookAvailable(bookCheckoutState.isbn)) {
        bookAvailable();
        if (await isBorrowerEligible(bookCheckoutState.card_id)) {
          eligible();
          dispatch(
            createLoan({
              isbn: bookCheckoutState.isbn,
              card_id: bookCheckoutState.card_id,
            })
          );
          successCheckOut();
        } else {
          notEligible();
        }
      } else {
        bookNotAvailable();
      }
    } else {
      errorBorrowerID();
    }

    cancelBookCheckoutModal();
  };

  const successCheckOut = () => {
    message.success(
      `Success: Borrower with ID ${bookCheckoutState.card_id} checked out the book with ISBN ${bookCheckoutState.isbn}`,
      3
    );
  };

  const successBorrowerID = () =>
    message.info("Validating the existence of the borrower ID...", 2, () =>
      message.success(`Success: Validation passed!! Request in progress...`, 3)
    );

  const errorBorrowerID = () => {
    message.info("Validating the existence of the borrower ID...", 2, () =>
      message.error(`Error: Validation failed...Request denied.`, 3)
    );
  };

  const bookAvailable = () => {
    message.info("Checking the avaiability of the borrower ID...", 2, () =>
      message.success(
        `Success: The books requested is avaiable. Request in progress...`,
        3
      )
    );
  };

  const bookNotAvailable = () => {
    message.info("Checking the avaiability of the borrower ID...", 2, () =>
      message.error(
        `Error: The books requested is not avaiable at the moment...Request denied.`,
        3
      )
    );
  };

  const eligible = () => {
    message.info(
      "Validating whether the borrower attempting to check out the book is eligble to check out any more books...",
      2,
      () =>
        message.success(
          `Success: Validation passed!! Request in progress...`,
          3
        )
    );
  };

  const notEligible = () =>
    message.info(
      "Validating whether the borrower attempting to check out the book is eligble to check out any more books...",
      2,
      () =>
        message.error(
          `Error: A borrower can at most have three active loans... Request denied.`,
          3
        )
    );

  const onBookCheckoutFormChange = (e) => {
    setBookCheckoutState({
      ...bookCheckoutState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onBookAddFormChange = (e) => {
    setBookAddState({
      ...bookAddState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchContent(e.target.value);
    if (e.target.value.length > 0) {
      let result = books.filter((bookRow) => {
        var authors = bookRow.book_authors.map((bookAuthorObj, key) => { return key === 0 ? "" + bookAuthorObj.authors.name + " ": ", " + bookAuthorObj.authors.name + "";})
        authors = authors.join(',')
        if (
          bookRow["title"].toLowerCase().includes(e.target.value.toLowerCase()) ||
          bookRow["isbn"].toLowerCase().includes(e.target.value.toLowerCase()) ||
          authors.toLowerCase().includes(e.target.value.toLowerCase())
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

  const toggleBookCreationModal = () => {
    setBookCreationModalOpen(!bookCreationModalOpen);
  };

  const cancelBookCreationModal = (e) => {
    toggleBookCreationModal();
    setBookAddState({ ...initialAddBookState });
  };

  const cancelBookCheckoutModal = (e) => {
    toggleBookCheckoutModal();
    setBookCheckoutState({ ...initialBookCheckoutState });
  };

  const toggleBookCheckoutModal = () => {
    setBookCheckoutModalOpen(!bookCheckoutModalOpen);
  };

  const onBookAddSubmit = async (e) => {
    e.preventDefault();
    // CHECK FOR VALID ISBN NUMBER

    // CHECK FOR VALID AUTHOR

    // CHECK FOR CORRECT BOOK TITLE

    // NOTIFICATION

    // CREATE BOOK
    const book = {
      title: title,
      isbn: isbn,
    };

    // CREATE AUTHOR
    const newAuthorID = uuidv4();
    const authorObject = {
      author_id: newAuthorID,
      name: author,
    };

    // CREATE IN BOOK AUTHOR TABLE
    const bookAuthor = {
      id: uuidv4(),
      author_id: newAuthorID,
      isbn: isbn,
    };

    dispatch(createBook(book))
      .then((e) => dispatch(createAuthor(authorObject)))
      .then((e) => dispatch(createBookAuthor(bookAuthor)));

    message.success("Added" + title + " by " + author, 2);

    // CLOSE MODAL
    toggleBookCreationModal();

    // RESET THE STATE
    setBookAddState({ ...initialAddBookState });
  };

  return (
    <div className="books-page w-auto">
      <input
        onChange={handleSearchChange}
        placeholder={"Search ISBN, Title, Author"}
        className="border border-transparent block mb-4 p-4 pl-4 text-lg text-gray-900 rounded-lg bg-gray-200 dark:text-white"
      />
      <CustomButton
        onClick={() => {
          toggleBookCreationModal();
        }}
      >
        {" "}
        Add Book
      </CustomButton>
      <div className={"mt-1"}>
      <BooksTable
        className={"books-table"}
        books={booksDisplayed}
        startCheckout={startCheckout}
        toggleBookCheckoutModal={toggleBookCheckoutModal}
        isBookAvailable={isBookAvailable}
        
      />
      </div>
      <Drawer
        title="Add Book"
        placement="right"
        onClose={toggleBookCreationModal}
        open={bookCreationModalOpen}
      >
        <form onSubmit={onBookAddSubmit}>
          <FormInput
            name="isbn"
            type="text"
            label="ISBN"
            value={bookAddState.isbn}
            handleChange={onBookAddFormChange}
            required
          />
          <FormInput
            name="title"
            type="text"
            label="Book Title"
            value={bookAddState.title}
            handleChange={onBookAddFormChange}
            required
          />
          <FormInput
            name="author"
            type="text"
            label="Author"
            value={bookAddState.author}
            handleChange={onBookAddFormChange}
            required
          />
          <div className="flex justify-between">
            <CustomButton>Submit</CustomButton>
            <CustomButton onClick={cancelBookCreationModal}>
              CANCEL
            </CustomButton>
          </div>
        </form>
      </Drawer>

      <Drawer
        title="Checkout Book"
        placement="left"
        onClose={toggleBookCheckoutModal}
        open={bookCheckoutModalOpen}
      >
        <form onSubmit={onHandleCheckout}>
          <FormInput
            name="isbn"
            type="text"
            label="ISBN"
            value={bookCheckoutState.isbn}
            handleChange={onBookCheckoutFormChange}
            required
          />
          <FormInput
            name="title"
            type="text"
            label="Book Title"
            value={bookCheckoutState.title}
            handleChange={onBookCheckoutFormChange}
            required
          />
          <FormInput
            name="card_id"
            type="text"
            label="Borrower"
            value={bookCheckoutState.card_id}
            handleChange={onBookCheckoutFormChange}
            required
          />
          <div className="flex justify-between">
            <CustomButton>Submit</CustomButton>
            <CustomButton onClick={cancelBookCheckoutModal}>
              CANCEL
            </CustomButton>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
export default BooksPage;
