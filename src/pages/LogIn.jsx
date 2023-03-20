import React, { useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, Navigate } from 'react-router-dom'

function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectPage, setRedirectPage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        if (email === "" || password === "") {
            alert("Enter all Data");
        }
        else {
            await fetch("https://localhost:5001/api/Account/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(finalData => {
                    if (finalData.statusCode === 401) {
                        alert("Your Email or password is wrong");
                    } else {
                        setRedirectPage(true);
                    }
                });
        }
    }

    if (redirectPage) {
        return <Navigate to="/" />
    } else {
        return (
            <>
                <div className='login flex bg-gray-50 w-full h-screen'>
                    <div className='image w-8/12 relative'>
                        <div className='absolute left-5 top-5 flex flex-col justify-center items-center mb-8'>
                            <Link to="/" className='flex flex-col items-center gap-0.5 text-white bg-indigo-500 py-2.5 px-4 rounded-md mb-6'>
                                <FaOpencart className='text-3xl bg-white text-indigo-500 p-1 rounded-full' />
                                <span className='logo_icon text-xl'>Tiangge</span>
                            </Link>
                        </div>
                        <div className="login_img w-full h-screen object-center object-cover"></div>
                    </div>
                    <div className='container flex justify-center items-center'>
                        <div>
                            <div className='flex flex-col justify-center items-center mb-8'>
                                <h3 className='text-2xl md:text-2xl font-bold mb-2 px-2 sm:px-24'>Log in to your account</h3>
                                <p className='text-neutral-700'>Welcome back! Please enter your details.</p>
                            </div>
                            <form className='bg-white rounded-md shadow-md p-10' onSubmit={handleSubmit}>
                                <div className='inputs'>
                                    <div className='my-4 flex flex-col gap-1'>
                                        <label className="font-medium text-base text-neutral-800">Email</label>
                                        <input type="email" className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border' placeholder='Enter Your email'
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className='my-4 flex flex-col gap-1'>
                                        <label className="font-medium text-base text-neutral-800">Password</label>
                                        <input type="password" className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border' placeholder='Enter Password'
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className='login_btns flex flex-col gap-3'>
                                    <div className='flex gap-1 justify-between'>
                                        <div className='text-sm flex gap-1 items-center select-none'>
                                            <input type="checkbox" id='remember'></input>
                                            <label htmlFor='remember'>Remember for 30 days</label>
                                        </div>
                                        <Link to="/forgetpassword" className='text-sm text-indigo-500'>Forget password</Link>
                                    </div>
                                    <button type="submit" className='bg-indigo-500  text-white p-2 rounded-md text-center mt-3 cursor-pointer hover:bg-indigo-600 transition duration-300' onClick={(e) => handleSubmit}>sign In</button>
                                    <button className='flex gap-2 justify-center items-center border focus:outline-none p-2 rounded-md border-neutral-400 text'>
                                        <FcGoogle className='text-xl' />
                                        <span>Sign in with Google</span>
                                    </button>
                                </div>
                            </form>
                            <div className='text-center mt-5'>
                                <span>Don't have an account? </span>
                                <Link to="/signup" className='text-indigo-500 underline'>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}
export default LogIn