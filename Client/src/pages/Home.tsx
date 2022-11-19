import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import StatCard from '../components/StatCard';

// redux imports
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getBooks } from '../redux/books/books.utils';
import { getBorrowers } from '../redux/borrowers/borrowers.utils'
import { getAuthors } from '../redux/authors/authors.utils'

import { SelectBookCount } from '../redux/books';
import { SelectAuthorCount } from '../redux/authors';
import { SelectBorrowerCount } from '../redux/borrowers';
import { SelectLoanCount } from '../redux/loans';
import { getLoans } from '../redux/loans/loans.utils';

const Home = () => {
    const dispatch = useAppDispatch()
    // get the total number of books
    const bookCount = useAppSelector(SelectBookCount)
    const borrowerCount = useAppSelector(SelectBorrowerCount)
    const authorCount = useAppSelector(SelectAuthorCount)
    const loanCount = useAppSelector(SelectLoanCount)


    useEffect(() => {
        dispatch(getBooks())
        dispatch(getBorrowers())
        dispatch(getAuthors())
        dispatch(getLoans())
    }, [dispatch]);

    return (
        <div className="">
            <Header />
            <div className="bg-[#d9d9d9] w-screen h-screen">
                <div className={"flex flex-col items-center justify-center "} >
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
                            <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray">
                            </div>
                            <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray">
                            </div>
                            <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray">
                            </div>
                            <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray">
                            </div>
                            <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;