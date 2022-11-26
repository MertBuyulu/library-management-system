import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#d9d9d9] ">
      <footer className="text-center p-4  md:items-center md:justify-between md:p-6 dark:bg-gray-800 absolute inset-x-0 bottom-0 h-16">
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <div className="flex flex- font-bold text-3xl "> Team Beriyllium </div>
        <div className="flex text-2xl"> Made with React </div>
        <div className="flex text-2xl"> Copyright 2022 </div>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
