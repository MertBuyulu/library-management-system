import React from "react"
import Logo from './Logo';
import { Button, Icon, IconBookOpen } from '@supabase/ui'
import { useNavigate } from "react-router-dom"



export default function Header() {
    // DEFINE NAVIGATE
    let navigate = useNavigate();

    return (
        <div className="border-2 border-b-black-500 ">
            < header className="flex justify-between">
                <Logo />
                <div className="flex  space-x-2 p-2 max-sm:space-x-1 max-sm:hidden">
                    <Button type="text" onClick={() => navigate("/Books")} > Books </Button>
                    <Button type="text" onClick={() => navigate("/Authors")}> Authors </Button>
                    <Button type="text" onClick={() => navigate("/Borrowers")}> Borrowers </Button>
                    <Button type="text" onClick={() => navigate("/Fines")}> Fines </Button>
                </div>

            </header >


        </div >
    )
}