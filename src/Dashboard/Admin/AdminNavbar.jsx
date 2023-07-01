import React from "react";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";


export default function AdminNavbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full z-10 shadow-sm  md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <Link
            className="text-white text-sm uppercase lg:inline-block font-semibold"
            to={"/dashboard"}
          >
            Dashboard
          </Link>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
