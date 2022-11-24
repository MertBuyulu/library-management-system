import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#d9d9d9]">
      <footer className="text-center p-4  md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <div className="flex flex-wrap justify-center">
            <h1 className="absolute font-bold text-4xl "> Team Beriyllium </h1>
            <div className="pt-16 flex space-x-4">
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray group cursor-pointer"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray group cursor-pointer"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray group cursor-pointer"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray group cursor-pointer"></div>
              <div className="w-40 h-40 bg-gray-200 rounded-full dark:bg-gray group cursor-pointer"></div>
            </div>
          </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Made with React
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              @Copyright 2022
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
