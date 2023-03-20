import React from 'react'
import { FaFacebook, FaRegUser, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function TopNav() {
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
                    <Link to="/logIn" className='login flex justify-between items-center gap-2  py-1 px-2 text-white rounded-md bg-indigo-500 shadow cursor-pointer'>
                        <FaRegUser />
                        <span className='mr-1'>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopNav