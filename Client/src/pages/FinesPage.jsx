import React from "react";
import { useSelector /* useDispatch*/ } from "react-redux";
import { SelectBorrowers } from "../redux/borrowers";
import { SelectFines } from "../redux/fines";

const FinesPage = () => {
  const borrowers = useSelector(SelectBorrowers);
  const fines = useSelector(SelectFines);

  return <div>FinesPage</div>;
};

export default FinesPage;
