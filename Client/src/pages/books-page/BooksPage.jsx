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

  // DEFINE BOOKS TO DISPLAY
  const [booksDisplayed, setBooksDisplayed] = useState(books)

  console.log(booksDisplayed[0])

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchContent(event.target.value)
    if (event.target.value.length > 0){
      var result = books.filter((bookRow) => {
        if(bookRow["title"].includes(event.target.value)  || bookRow["isbn"].includes(event.target.value)){
          return true
        }else{
          return false
        }
      })

      setBooksDisplayed(result)
    }
    else{
      setBooksDisplayed(books)
    }
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

  return (
    <div className="books-page">
        <input
        onChange={handleChange}
        />
        
        {/* <Search searchContent={searchContent} /> */}
        <CustomButton
          onClick={() => {
            toggleModal()
          }}
          >
          {" "}
          Add Book
        </CustomButton>
        <BooksTable books={booksDisplayed} />

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
