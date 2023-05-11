import React, { useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import InputCom from '../components/InputCom';

function SignUp() {
    const [displayName, setDisplayName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [redirectPage, setRedirectPage] = useState(false);
    let navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (displayName === "" || firstName === "" || lastName === "" || email === "" || password === "" || phoneNumber === "" || country === "" || city === "" || street === "") {
            alert("Can't send empty Fields")
        } else {
            const data = { displayName, firstName, lastName, phoneNumber, email, password, country, city, street }
            await fetch("https://localhost:5001/api/Account/register", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setRedirectPage(true);
        }
    }

    if (redirectPage) {
        return navigate("/login");
    } else {
        return (
            <>
                <div className='login bg-gray-50 w-full py-20 flex justify-center items-center'>
                    <div>
                        <div className='flex flex-col justify-center items-center mb-8'>
                            <Link to="/" className='flex flex-col items-center gap-0.5 text-white bg-main-color py-2.5 px-4 rounded-md mb-6'>
                                <FaOpencart className='text-3xl bg-white text-main-color p-1 rounded-full' />
                                <span className='logo_icon text-xl'>Tiangge</span>
                            </Link>
                            <h3 className='text-2xl md:text-2xl font-bold mb-2 px-2 sm:px-24'>Create an account</h3>
                            <p className='text-neutral-700'>Start your 30-day free trial.</p>
                        </div>
                        <form method='POST' className='bg-white rounded-md shadow-md p-10  m-auto w-11/12 lg:w-5/12' onSubmit={submitHandler}>
                            <div className='inputs flex flex-wrap gap-x-5'>
                                <InputCom type="text" label="Display Name" placeholder="Enter your Display Name" handler={setDisplayName} id="displayName" />
                                <InputCom type="text" label="First Name" placeholder="Enter your First Name" handler={setFirstName} id="firstName" />
                                <InputCom type="text" label="Last Name" placeholder="Enter your Last Name" handler={setLastName} id="lastName" />
                                <InputCom type="email" label="Email" placeholder="Enter your Email" handler={setEmail} id="phoneNumber" />
                                <InputCom type="password" label="Password" placeholder="Enter your Password" handler={setPassword} id="email" />
                                <InputCom type="number" label="Phone" placeholder="Enter your Phone" handler={setPhoneNumber} id="password" />
                                <InputCom type="text" label="Country" placeholder="Enter your Country" handler={setCountry} id="country" />
                                <InputCom type="text" label="City" placeholder="Enter your City" handler={setCity} id="city" />
                                <InputCom type="text" label="Street" placeholder="Enter your Street" handler={setStreet} id="street" />
                            </div>
                            <div className='login_btns flex flex-col gap-3'>
                                <button type="submit" className='bg-main-color  text-white p-2 rounded-md text-center mt-3 cursor-pointer hover:bg-indigo-600 transition duration-300'>
                                    <span>Get started</span>
                                </button>
                                <button className='flex gap-2 justify-center items-center border focus:outline-none p-2 rounded-md border-neutral-400 text'>
                                    <FcGoogle className='text-xl' />
                                    <span>Sign up with Google</span>
                                </button>
                            </div>
                        </form>
                        <div className='text-center mt-5'>
                            <span>Already have an account? </span>
                            <Link to="/login" className='text-main-color underline'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default SignUp