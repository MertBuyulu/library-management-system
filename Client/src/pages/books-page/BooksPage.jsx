import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// styles
import "./BooksPage.styles.scss";

// components
import { Drawer, message, notification } from "antd";
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import BooksTable from "./BooksTable";
import Search from "../../components/Search";

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
  validateBorrowerId,
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
  borrower: "",
}

const BooksPage = () => {
  // HOOKS & REDUX & STATE MANAGEMENT
  const [bookCreationModalOpen, setBookCreationModalOpen] = useState(false);
  const [bookCheckoutModalOpen, setBookCheckoutModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [booksAuthorsData, setBookAuthorsData] = useState({});
  const dispatch = useDispatch();
  const books = useSelector(SelectBooksWithKeys);
  const [bookAddState, setBookAddState] = useState(initialAddBookState);
  const [bookCheckoutState, setBookCheckoutState] = useState(initialBookCheckoutState);
  const { isbn, title, author} = bookAddState;
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
  const onHandleCheckout = (e) => {
    e.preventDefault();   
    dispatch(createLoan({
      isbn: bookCheckoutState.isbn,
      card_id: bookCheckoutState.borrower
    })).then((e) => 
      {
        try{
          if(e.payload.toLowerCase().includes("failed")){
            message.error("Could not checkout!")
          }
        }catch{
            message.success("Checked out!")
        }

      })

    cancelBookCheckoutModal();

    
    
  };

  const startCheckout = (isbn, authors, title) => {
    setBookCheckoutState({...bookCheckoutState, isbn: isbn,  title: title})
    toggleBookCheckoutModal();
  }

  const onBookCheckoutFormChange = (e) => {
    setBookCheckoutState({ ...bookCheckoutState, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onBookAddFormChange = (e) => {
    setBookAddState({ ...bookAddState, [e.currentTarget.name]: e.currentTarget.value });
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
      isbn: isbn
    }
    
    // CREATE AUTHOR
    const newAuthorID = uuidv4();
    const authorObject = {
      author_id: newAuthorID,
      name: author
    }


     
     
    // CREATE IN BOOK AUTHOR TABLE
    const bookAuthor = {
      id: uuidv4(),
      author_id: newAuthorID,
      isbn: isbn
    }
    
    dispatch(createBook(book)).then((e)=>dispatch(createAuthor(authorObject))).then((e)=> dispatch(createBookAuthor(bookAuthor)))


    message.success("Added" + title + " by " + author, 2);
    
    // CLOSE MODAL
    toggleBookCreationModal();
    
    // RESET THE STATE
    setBookAddState({ ...initialAddBookState });
  };

  return (
    <div className="books-page">
      <input onChange={handleSearchChange} placeholder={"Search ISBN, Title, Author"} className="border border-transparent block mb-4 p-4 pl-4 text-lg text-gray-900 rounded-lg bg-gray-200 dark:text-white" />
      <CustomButton
        onClick={() => {
          toggleBookCreationModal();
        }}
      >
        {" "}
        Add Book
      </CustomButton>
      <BooksTable
        books={booksDisplayed}
        startCheckout={startCheckout}
        toggleBookCheckoutModal={toggleBookCheckoutModal}
        isBookAvailable={isBookAvailable}
      />
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
            <CustomButton onClick={cancelBookCreationModal}>CANCEL</CustomButton>
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
            name="borrower"
            type="text"
            label="Borrower"
            value={bookCheckoutState.borrower}
            handleChange={onBookCheckoutFormChange}
            required
          />
          <div className="flex justify-between">
            <CustomButton>Submit</CustomButton>
            <CustomButton onClick={cancelBookCheckoutModal}>CANCEL</CustomButton>
          </div>
        </form>
      </Drawer>

    </div>
  );
};
export default BooksPage;
