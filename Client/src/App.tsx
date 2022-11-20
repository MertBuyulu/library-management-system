import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BorrowersPage from "./pages/BorrowersPage";
import LoansPage from "./pages/LoansPage";
import FinesPage from "./pages/FinesPage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Books" element={<h1> To be implemented </h1>} />
        <Route path="/Authors" element={<h1> To be implemented </h1>} />
        <Route path="/Borrowers" element={<BorrowersPage/>} />
        <Route path="/Loans" element={<LoansPage/>} />
        <Route path="/Fines" element={<FinesPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
