import { useEffect } from "react";

// components
import Search from "../components/Search";
import StatCard from "../components/StatCard";

// redux imports
import { getBooks } from "../redux/books/books.utils";
import { getBorrowers } from "../redux/borrowers/borrowers.utils";
import { getLoans } from "../redux/loans/loans.utils";
import { getAuthors } from "../redux/authors/authors.utils";
import { getFines } from "../redux/fines/fines.utils";
import { SelectBookCount } from "../redux/books";
import { SelectAuthorCount } from "../redux/authors";
import { SelectBorrowerCount } from "../redux/borrowers";
import { SelectLoanCount } from "../redux/loans";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const bookCount = useSelector(SelectBookCount);
  const borrowerCount = useSelector(SelectBorrowerCount);
  const authorCount = useSelector(SelectAuthorCount);
  const loanCount = useSelector(SelectLoanCount);

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getBorrowers());
    dispatch(getAuthors());
    dispatch(getLoans());
    dispatch(getFines());
  }, [dispatch]);

  return (
    <div className="">
      <div className="bg-[#d9d9d9] w-screen h-screen">
        <div className={"flex flex-col items-center justify-center "}>
          <div className="m-8">
            <Search />
          </div>
          <div className={"flex space-x-10 m-2"}>
            <StatCard Name={"Books"} Amount={bookCount} />
            <StatCard Name={"Authors"} Amount={authorCount} />
            <StatCard Name={"Borrowers"} Amount={borrowerCount} />
            <StatCard Name={"Loans"} Amount={loanCount} />
          </div>
          <div className="flex justify-center mt-10 ">
            <h1 className="absolute font-bold text-4xl "> Team Beriyllium </h1>
            <div className="pt-16 flex space-x-4 ">
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
