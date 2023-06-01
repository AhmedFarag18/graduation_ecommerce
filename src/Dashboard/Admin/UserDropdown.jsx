import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './../../redux/slices/auth-slice'
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const UserDropdown = () => {
  const authUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-indigo-500 block"
        href=""
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-main-color bg-white inline-flex items-center justify-center rounded-full">
            {authUser.displayName.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </a>

      <div ref={popoverDropdownRef} className={(dropdownPopoverShow ? "block " : "hidden ") + "bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-48"}>
        <div className="px-4 py-3 text-sm text-gray-900 ">
          <div className="">{authUser.displayName}</div>
          <div className="font-medium max-sm:w-20 truncate">{authUser.email}</div>
        </div>

        <Link to={"/"} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-indigo-700 hover:bg-main-color hover:text-white transition duration-300 rounded-sm"}>
          Home
        </Link>

        <Link to={"/dashboard"} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-indigo-700 hover:bg-main-color hover:text-white transition duration-300 rounded-sm"}>
          Something else
        </Link>

        <a href="" className={" text-sm py-2 px-4 font-normal flex gap-1 items-center justify-between w-full whitespace-nowrap text-white bg-red-600 hover:text-white transition duration-300 rounded-sm"}
          onClick={(e) => {
            e.preventDefault()
            dispatch(authActions.logout())
            navigate("/login")
          }}>
          Log Out <IoIosLogOut className="text-2xl" />
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
