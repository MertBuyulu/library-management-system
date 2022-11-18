import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Logo from "./Components/Logo"
import { Button, Card } from '@supabase/ui';
import { useQuery } from 'react-query'
import Search from './Components/Search';
import StatCard from './Components/StatCard';

type MetaResponse = {
    Amount: String
}



export default function Home() {
    const [loading, setLoading] = React.useState()
    const [amountBooks, setAmountBooks] = React.useState<{}>();
    const [amountAuthors, setAmountAuthors] = React.useState<{}>();
    const [amountFines, setAmountFines] = React.useState<{}>();
    const [amountBorrowers, setAmountBorrowers] = React.useState<{}>();
    const [amountLoans, setAmountLoans] = React.useState<{}>();

    useEffect(() => {
        const Amount = getNumBooks()
        getNumBooks().then(
            (response: MetaResponse) => {
                if (response) {
                    setAmountBooks(response.Amount)
                }
            })
    }, []);
    return (
        <div className="">
            <Header />
            <div className="bg-[#d9d9d9] w-screen h-screen">
                <div className={"flex flex-col items-center justify-center "} >
                    <div className="m-8">
                        <Search />
                    </div>
                    <div className={"flex space-x-10 m-2"}>
                        <StatCard Name={"Books"} Amount={String(amountBooks)} />
                        <StatCard Name={"Authors"} Amount={String(amountAuthors)} />
                        <StatCard Name={"Borrowers"} Amount={String(amountBorrowers)} />
                        <StatCard Name={"Loans"} Amount={String(amountLoans)} />
                        <StatCard Name={"Fines"} Amount={String(amountFines)} />
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


const getNumBooks = async (): Promise<MetaResponse> => {
    const response = await fetch("http://localhost:3001/book/?onlyMeta=True")
    const responseJSON = JSON.parse(await response.text())
    return responseJSON
}

const getNumAuthors = async (): Promise<MetaResponse> => {
    const response = await fetch("http://localhost:3001/author/?onlyMeta=True")
    const responseJSON = JSON.parse(await response.text())
    return responseJSON
}

async function getNumBorrowers(): Promise<MetaResponse> {
    const response: Response = await fetch("http://localhost:3001/borrower/?onlyMeta=True")
    const responseJSON = JSON.parse(await response.text())
    return responseJSON
}

async function getNumLoans() {
    const response = await fetch("http://localhost:3001/loan/?onlyMeta=True")
    const responseJSON = JSON.parse(await response.text())
    return responseJSON
}

async function getNumFines() {
    const response = await fetch("http://localhost:3001/fine/?onlyMeta=True")
    const responseJSON = JSON.parse(await response.text())
    return responseJSON
}