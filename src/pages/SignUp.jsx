import React, { useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import InputCom from '../components/InputCom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Formik } from 'formik/dist';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { API_URL } from '../App';

function SignUp() {
    const [redirectPage, setRedirectPage] = useState(false);
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [emailExists, setEmailExists] = useState(false);

    // start initializing validation
    const InitialValues = {
        displayName: "", firstName: "", lastName: "", phoneNumber: "", country: "", city: "", street: "", email: "", password: ""
    };
    const validationSchema = Yup.object().shape({
        displayName: Yup.string().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        phoneNumber: Yup.string().matches(/^[0-9]{11}$/, 'phoneNumber must be 11 number').required(),
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        country: Yup.string().required(),
        city: Yup.string().required(),
        street: Yup.string().required(),
    });



    const handleSubmit = async (values, { setSubmitting }) => {
        // check if the email address is already existing
        fetch(`${API_URL}/Account/emailexists?email=${values.email}`)
            .then(res => res.json())
            .then((data) => {
                setEmailExists(data);
            })

        if (emailExists) {
            toast.error("email already exists");
        } else {
            const data = values
            await fetch(`${API_URL}/Account/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setRedirectPage(true);
            toast.success("Sign up successfully");
            setSubmitting(false);
        }
    }

    if (redirectPage) {
        return navigate("/login");
    } else {
        return (
            <>
                <div className='signup bg-gray-50 w-full py-20 flex justify-center items-center'>
                    <div>
                        <div className='flex flex-col justify-center items-center mb-8'>
                            <Link to="/" className='flex flex-col items-center gap-0.5 text-white bg-main-color py-2.5 px-4 rounded-md mb-6'>
                                <FaOpencart className='text-3xl bg-white text-main-color p-1 rounded-full' />
                                <span className='logo_icon text-xl'>Nova</span>
                            </Link>
                            <h3 className='text-2xl md:text-3xl text-neutral-50 font-bold mb-2 px-2 sm:px-24'>Create an Account</h3>
                            <p className='text-neutral-100'>Start your 30-day free trial.</p>
                        </div>
                        <Formik
                            initialValues={InitialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {props => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit} method='POST' className='select-none bg-white rounded-md shadow-md p-10  m-auto w-11/12 lg:w-5/12' >
                                        <div className='inputs flex flex-wrap gap-x-5'>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="Display Name"
                                                    onBlur={handleBlur} value={values.displayName} placeholder="John22" handler={handleChange} id="displayName" />
                                                {errors.displayName && touched.displayName && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.displayName}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="First Name"
                                                    onBlur={handleBlur} value={values.firstName} placeholder="John" handler={handleChange} id="firstName" />
                                                {errors.firstName && touched.firstName && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.firstName}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="Last Name"
                                                    onBlur={handleBlur} value={values.lastName} placeholder="Doe" handler={handleChange} id="lastName" />
                                                {errors.lastName && touched.lastName && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.lastName}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="email" label="Email"
                                                    onBlur={handleBlur} value={values.email} placeholder="ahmed@gmail.com" handler={handleChange} id="email" />
                                                {errors.email && touched.email && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.email}</div>
                                                )}
                                            </div>
                                            <div className='my-4 flex flex-col gap-1'>
                                                <label className="font-medium text-base text-neutral-800 after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
                                                <div className='relative'>
                                                    <input type={showPassword ? 'text' : 'password'} onChange={handleChange}
                                                        onBlur={handleBlur} value={values.password} name="password" id="password" placeholder="••••••••" className="p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border" required="" />
                                                    <span onClick={toggleShowPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                    </span>
                                                </div>
                                                {errors.password && touched.password && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.password}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="Phone"
                                                    onBlur={handleBlur} value={values.phoneNumber} placeholder="+201292823837" handler={handleChange} id="phoneNumber" />
                                                {errors.phoneNumber && touched.phoneNumber && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.phoneNumber}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="Country"
                                                    onBlur={handleBlur} value={values.country} placeholder="egypt" handler={handleChange} id="country" />
                                                {errors.country && touched.country && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.country}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="City"
                                                    onBlur={handleBlur} value={values.city} placeholder="cairo" handler={handleChange} id="city" />
                                                {errors.city && touched.city && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.city}</div>
                                                )}
                                            </div>
                                            <div className='flex flex-col'>
                                                <InputCom type="text" label="Street"
                                                    onBlur={handleBlur} value={values.street} placeholder="12st maadi" handler={handleChange} id="street" />
                                                {errors.street && touched.street && (
                                                    <div className="text-red-600 text-xs pl-2">{errors.street}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='login_btns flex flex-col gap-3'>
                                            <button type="submit" disabled={isSubmitting} className='bg-main-color  text-white p-2 rounded-md text-center mt-3 cursor-pointer hover:bg-indigo-600 transition duration-300'>
                                                <span>Get started</span>
                                            </button>
                                            {/* <button type='button' className='flex gap-2 justify-center items-center border focus:outline-none p-2 rounded-md border-neutral-400 text'>
                                                <FcGoogle className='text-xl' />
                                                <span>Sign up with Google</span>
                                            </button> */}
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                        <div className='text-center mt-5'>
                            <span className='text-neutral-50'>Already have an account? </span>
                            <Link to="/login" className='text-main-color underline'>Sign in</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default SignUp