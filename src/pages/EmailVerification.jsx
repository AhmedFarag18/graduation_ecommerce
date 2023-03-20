import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { Link } from 'react-router-dom'

function EmailVerification() {
    return (
        <>
            <div className='flex justify-center py-10 h-screen w-full'>
                <div className='p-4 text-center'>
                    <div className='w-max m-auto mb-5 bg-gray-100 text-indigo-500 rounded-full p-3 flex justify-center items-center text-2xl shadow'>
                        <HiOutlineMail />
                    </div>
                    <h3 className='text-3xl font-semibold'>Check your email</h3>
                    <div className='flex flex-col mb-8 mt-3'>
                        <span className='text-neutral-700'>We sent a verification link to</span>
                        <span className='text-neutral-700'>ahmedfarag@gmail.com</span>
                    </div>
                    <div className='flex gap-2 mb-8'>
                        <span className='text-4xl font-semibold text-indigo-500 h-16 w-full max-sm:p-4 sm:w-16 border border-indigo-500 bg-transparent rounded-lg flex justify-center items-center'>3</span>
                        <span className='text-4xl font-semibold text-indigo-500 h-16 w-full max-sm:p-4 sm:w-16 border border-indigo-500 bg-transparent rounded-lg flex justify-center items-center'>0</span>
                        <span className='text-4xl font-semibold text-indigo-500 h-16 w-full max-sm:p-4 sm:w-16 border border-indigo-500 bg-transparent rounded-lg flex justify-center items-center'>6</span>
                        <span className='text-4xl font-semibold text-indigo-500 h-16 w-full max-sm:p-4 sm:w-16 border border-indigo-500 bg-transparent rounded-lg flex justify-center items-center'>6</span>
                    </div>
                    <button className='p-2 mb-8 bg-indigo-500 w-full rounded-lg text-white hover:bg-indigo-600 duration-200'>Verify email</button>
                    <p className='text-sm mb-8'>Didn't receive the email? <span className='text-indigo-500 cursor-pointer'>Click to resend</span></p>
                    <Link to="/login" className='flex gap-2 border border-indigo-500 text-indigo-500 p-2 rounded justify-center items-center text-sm'>
                        <FaArrowLeft />
                        <span>Back to log in</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default EmailVerification