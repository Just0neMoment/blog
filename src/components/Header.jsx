import React, { useState } from "react";

import { Button } from "@nextui-org/react";

import ThemeToggleButton from "./ThemeToggleButton.jsx";

function Header() {
  document.querySelector("html").classList.add("dark");

  return (
    <>
      <div className="flex items-center justify-evenly border-b border-[#dddddd] px-14 py-3 dark:border-[#242424]">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">Yeon's Blog</h1>

        {/* Nav */}
        <nav>
          <ul className="flex items-center">
            <li className="px-5 py-2 text-[15px] hover:cursor-pointer hover:text-primary">
              Home
            </li>
            <div className="h-3.5 w-px bg-[#dddddd] dark:bg-[#424242]"></div>
            <li className="px-5 py-2 text-[15px] hover:cursor-pointer hover:text-primary">
              Posts
            </li>
            <div className="h-3.5 w-px bg-[#dddddd] dark:bg-[#424242]"></div>
            <li className="px-5 py-2 text-[15px] hover:cursor-pointer hover:text-primary">
              About
            </li>
            <div className="h-3.5 w-px bg-[#dddddd] dark:bg-[#424242]"></div>
            <li className="px-5 py-2 text-[15px] hover:cursor-pointer hover:text-primary">
              Contact
            </li>
          </ul>
        </nav>

        {/* button list */}
        <div className="flex gap-2">
          <ThemeToggleButton />
          <Button color="primary" variant="ghost" size="md">
            로그인
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
