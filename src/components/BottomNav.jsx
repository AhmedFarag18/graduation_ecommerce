import React from 'react'
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md"
import { FiSearch } from "react-icons/fi"
import { BsCart2 } from "react-icons/bs"

function BottomNav() {
    const focus = () => document.getElementById("search-navbar").focus();
    return (
        <>
            <div className='container gap-4'>
                <div className='flex items-center justify-between'>
                    <ul className='flex gap-3 max-md:gap-1'>
                        <li className='max-md:p-1 p-1.5 hover:text-main-color transition-colors duration-300'><Link to="/">Home</Link></li>
                        <li className='max-md:p-1 p-1.5 hover:text-main-color transition-colors duration-300'><Link to="/category">category</Link></li>
                        <li className='max-md:p-1 p-1.5 hover:text-main-color transition-colors duration-300'><Link to="/products">Products</Link></li>
                        <li className='max-md:p-1 p-1.5 hover:text-main-color transition-colors duration-300'><Link to="/contact">Contact</Link></li>
                    </ul>
                    <ul className='max-md:hidden flex gap-3'>
                        <Link className='flex gap-1 p-1.5'>
                            <span className='text-sm' onClick={focus} >Search</span>
                            <FiSearch className='text-xl text-neutral-500' onClick={focus} /></Link>
                        <Link className='flex gap-1 p-1.5'>
                            <span className='text-sm'>Wishlist</span>
                            <MdFavoriteBorder className='text-xl text-neutral-500' /></Link>
                        <Link to="/cart" className='flex gap-1 p-1.5'>
                            <span className='text-sm'>Cart</span>
                            <BsCart2 className='text-xl text-neutral-500' /></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BottomNav