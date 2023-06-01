import React from "react";
import UserDropdown from "./UserDropdown";


export default function AdminNavbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-slate-100 shadow-sm  md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-main-color text-sm uppercase lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
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
