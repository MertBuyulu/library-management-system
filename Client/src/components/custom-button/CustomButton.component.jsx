import React from "react";
import "./CustomButton.styles.scss";

const CustomButton = ({ children, onClick, wide }) => {
  return (
    <button
      onClick={onClick}
      className={!wide ? "custom-button" : "custom-button-wide"}
    >
      {children}
    </button>
  );
};

export default CustomButton;
