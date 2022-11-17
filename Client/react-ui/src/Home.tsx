import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Logo from "./Components/Logo"
import { Card } from '@supabase/ui';
import Search from './Components/Search';
import StatCard from './Components/Stat';
export default function Home() {
    return (
        <div className="">
            <Header />

            <div className="bg-[#d9d9d9] w-screen h-screen">
                <div className={"flex flex-col items-center justify-center "} >
                    <div className="m-8">
                    <Search />
                    </div>
                    <div className={"flex space-x-10 m-2"}>
                    <StatCard />
                    <StatCard />
                    <StatCard />
                    <StatCard />
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
