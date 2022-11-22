import React, { useState } from "react";
// styles
import "./BorrowersPage.styles.scss";
// components
import CustomButton from "../../components/custom-button/CustomButton.component";
import FormInput from "../../components/form-input/FormInput.component";
import Table from "../../components/table/Table.component";
// redux
import { useDispatch, useSelector } from "react-redux";
import { createBorrower } from "../../redux/borrowers/borrowers.utils";
import { SelectBorrowers } from "../../redux/borrowers/index";
// validation
import { validateSsn } from "../../utils/validate";

const initialState = {
  ssn: "",
  bname: "",
  address: "",
  phone: "",
};

const BorrowersPage = () => {
  const dispatch = useDispatch();
  const borrowers = useSelector(SelectBorrowers);

  const [state, setState] = useState(initialState);
  const { ssn, bname, address, phone } = state;

  const onChange = (e) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmit = (ssn) => (e) => {
    e.preventDefault();
    if (!validateSsn(ssn))
      //dispatch(createBorrower({ ssn, bname, address, phone }));
      alert("Ssn you entered is valid!!");
    else alert("Ssn you entered is already in use. Please enter a unique ssn.");

    // reset the state
    setState({ ...initialState });
  };

  const columns = [
    { heading: "Borrower ID", value: "card_id", key: 1 },
    { heading: "Ssn", value: "ssn", key: 2 },
    { heading: "Full Name", value: "bname", key: 3 },
    { heading: "Home Adress", value: "address", key: 4 },
    { heading: "Phone", value: "phone", key: 5 },
  ];

  return (
    <div className="borrowers-page">
      <div className="borrower-form">
        <form onSubmit={onSubmit(ssn)}>
          <FormInput
            name="ssn"
            type="text"
            label="SSN"
            value={ssn}
            onChange={onChange}
            required
          />
          <FormInput
            name="bname"
            type="text"
            label="Full Name"
            value={bname}
            onChange={onChange}
            required
          />
          <FormInput
            name="address"
            type="text"
            label="Billing Address"
            value={address}
            onChange={onChange}
            required
          />
          <FormInput
            name="phone"
            type="text"
            label="Phone Number"
            value={phone}
            onChange={onChange}
          />
          <CustomButton>Submit</CustomButton>
        </form>
      </div>
      <div className="borrower-table">
        <Table data={borrowers} columns={columns} />
      </div>
    </div>
  );
};

export default BorrowersPage;
