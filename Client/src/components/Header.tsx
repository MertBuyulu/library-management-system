import Logo from './Logo';
import { useNavigate } from "react-router-dom"


const Header = () => {

    const navigate = useNavigate();

    return (
        <div className="border-2 border-b-black-500 bg-[#d9d9d9]">
            <div>
            <header className="flex justify-between">
                <Logo />
                <div className="space-x-3 mt-3 pr-12 ">
                    <button className="hover:text-[#6D696A]" onClick={() => navigate("/Books")} > Books </button>
                    <button className="hover:text-[#6D696A]" onClick={() => navigate("/Authors")}> Authors </button>
                    <button className="hover:text-[#6D696A]" onClick={() => navigate("/Borrowers")}> Borrowers </button>
                    <button className="hover:text-[#6D696A]" onClick={() => navigate("/Fines")}> Fines </button>
                </div>
                <button className="object-right ">
                    <svg className="w-11 h-11 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
            </header>
            </div>
        </div>
    )
}

export default Header;