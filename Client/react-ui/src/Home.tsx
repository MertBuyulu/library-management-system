import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Logo from "./Components/Logo"
import { Card } from '@supabase/ui';
import Search from './Components/Search';
export default function Home() {
    return (
        <div className="">
            {/* <Header /> */}
            <Search />
        </div>
    )
} 
