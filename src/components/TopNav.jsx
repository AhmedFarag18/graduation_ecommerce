import React, { useState } from 'react'
import { FaFacebook, FaRegUser, FaTwitter } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { authActions } from '../redux/slices/auth-slice';

function TopNav() {

    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.user);
    const [isOpen, toggleSidebar] = useState(false);


    return (
        <div className='topnav border-b-neutral-100 border-b'>
            <div className='container'>
                <div className='flex justify-between items-center py-2'>
                    <div className='social flex justify-between items-center gap-3'>
                        <div className='flex justify-between items-center gap-1 text-neutral-500'>
                            <FaFacebook />
                            <span>Facebook</span>
                        </div>
                        <div className='flex justify-between items-center gap-1 text-neutral-500'>
                            <FaTwitter />
                            <span>Twitter</span>
                        </div>
                    </div>
                    {
                        !authUser ?
                            <Link to="/logIn" className='login flex justify-between items-center gap-2  py-1 px-2 text-white rounded-md bg-main-color shadow cursor-pointer'>
                                <FaRegUser />
                                <span className='mr-1'>Login</span>
                            </Link>
                            :
                            <div className='relative select-none'>
                                <div className="relative  cursor-pointer inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full" onClick={() => { isOpen ? toggleSidebar(false) : toggleSidebar(true) }}>
                                    <span className="font-medium text-gray-600 ">{authUser.displayName.slice(0, 2).toUpperCase()}</span>
                                </div>
                                <div id="userDropdown" className={`absolute right-0 z-10 ${isOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                    <div className="px-4 py-3 text-sm text-gray-900 ">
                                        <div>{authUser.displayName}</div>
                                        <div className="font-medium truncate">{authUser.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
                                        <li>
                                            <Link to="/dashboard" href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <Link onClick={() => dispatch(authActions.logout())} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Sign out</Link>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopNav