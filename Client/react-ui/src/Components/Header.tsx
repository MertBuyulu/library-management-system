import React from "react"
import Logo from './Logo';
import { Button, Icon, IconBookOpen } from '@supabase/ui'

export default function Header() {
    return (
        <div className="border-2 border-b-black-500 ">
            < header className="flex justify-between">
                <Logo />
                <div className="flex  space-x-2 p-2 max-sm:space-x-1 max-sm:hidden">
                    <Button type="text"> Books </Button>
                    <Button type="text"> Authors </Button>
                    <Button type="text"> Borrowers </Button>
                    <Button type="text"> Fines </Button>
                </div>

            </header >


        </div >
    )
}