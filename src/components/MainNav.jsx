import React from 'react'
import { Link } from 'react-router-dom';
import { FaOpencart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from 'react-icons/fi';
import { RiShoppingCartLine } from 'react-icons/ri';

function MainNav() {
    const [isOpen, toggleSidebar] = React.useState(true);

    return (
        <>
            <div className='px-2 sm:px-0 py-4 border-b border-neutral-100'>
                <div className="container flex flex-wrap items-center justify-between mx-auto gap-5">
                    <div className='flex items-center  cursor-auto md:flex-grow'>
                        <Link to="/">
                            <span className="logo_icon flex justify-center items-center gap-1 self-center text-4xl font-bold whitespace-nowrap text-indigo-500 cursor-pointer"> <FaOpencart className='inline-block text-3xl' /> Tiangge.</span>
                        </Link>
                    </div>
                    <div className="flex md:hidden">
                        <button type="button" className="inline-flex items-center p-2 text-xl text-white bg-indigo-500 rounded md:hidden focus:outline-none" onClick={() => { isOpen ? toggleSidebar(false) : toggleSidebar(true) }}>
                            <AiOutlineMenu />
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full flex-grow  md:flex md:w-auto gap-4 ${isOpen ? "hidden" : "flex flex-col md:flex-row"} `} id="navbar-sticky">
                        <div className="relative md:block flex w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiSearch className='text-neutral-500 text-xl' />
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                        </div>
                        <div className='flex flex-row gap-3 w-full md:justify-end'>
                            <div className='relative p-1.5 border rounded-md'>
                                <RiShoppingCartLine className='text-neutral-500 text-3xl p-0.5 w-full' />
                                <span className='absolute -top-2 -right-2 rounded-full w-5 h-5 text-sm flex items-center justify-center text-white bg-indigo-500'>12</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-medium'>Shopping cart</span>
                                <span className='text-sm'>Item - $325.11</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainNav