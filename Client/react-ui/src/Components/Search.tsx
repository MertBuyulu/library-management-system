import React from "react"
import { Input } from "@supabase/ui"
export default function Search() {
    // SET STATE FOR SHOW SEARCH ICON
    const [showSearchIcon, setShowSearchIcon] = React.useState(false)

    const handleChange = (event: any) => {
        if (event.target.value.length > 0) {
            console.log(event.target.value.length)
            setShowSearchIcon(false)
        } else {
            setShowSearchIcon(true)
        }
    }


    return (

        <form className="lg:max-w-screen-lg md:max-w-screen-md sm: max-w-screen-sm">

            <div className="relative">
                <input onChange={handleChange} type="search" id="default-search" className="border border-transparent block w-full p-4 pl-4 text-sm text-gray-900 rounded-lg bg-gray-50 dark:text-white" placeholder="Search..." required></input>

                {
                    showSearchIcon ?
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3  pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        :
                        null
                }


            </div>
        </form>


    )

}