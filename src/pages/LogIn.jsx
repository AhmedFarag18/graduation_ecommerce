import React, { useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { extraLoginAction } from '../redux/slices/auth-slice';
import { getCart } from '../redux/slices/cart-slice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as Yup from 'yup';
import { Formik } from 'formik/dist';
import { createBasket } from '../redux/slices/basket-slice';

function LogIn() {
    let navigate = useNavigate();
    const authUser = useSelector(x => x.auth.user);
    let cartData = useSelector(x => x.auth.cart);
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // start initializing validation
    const InitialValues = { email: "", password: "" };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Email is Required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setTimeout(() => {
            const data = values;
            dispatch(extraLoginAction(data));
            if (localStorage.getItem("cart_id")) {
                dispatch(getCart())
                cartData = localStorage.getItem("cart");
            } else {
                dispatch(createBasket())
            }
            setSubmitting(false);
        }, 500);
    }


    if (authUser) {
        return <Navigate to="/" replace={true} />
    } else {
        return (
            <>
                <div className='login flex bg-gray-50 w-full h-screen'>
                    <div className='image w-8/12 relative'>
                        <div className='absolute left-5 top-5 flex flex-col justify-center items-center mb-8'>
                            <Link to="/" className='flex flex-col items-center gap-0.5 text-white bg-indigo-500 py-2.5 px-4 rounded-md mb-6'>
                                <FaOpencart className='text-3xl bg-white text-indigo-500 p-1 rounded-full' />
                                <span className='logo_icon text-xl'>Nova</span>
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
                                        <form onSubmit={handleSubmit} className='bg-white rounded-md shadow-md p-10'>
                                            <div className='inputs'>
                                                <div className='my-4 flex flex-col gap-1'>
                                                    <label className="font-medium text-base text-neutral-800" htmlFor="email">Email</label>
                                                    <input
                                                        name="email"
                                                        type="text"
                                                        placeholder="Enter your email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                                                    />
                                                    {errors.email && touched.email && (
                                                        <div className="text-red-600 text-sm pl-2">{errors.email}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='my-4 flex flex-col gap-1'>
                                                <label className="font-medium text-base text-neutral-800" htmlFor="password">Password</label>
                                                <div className='relative'>
                                                    <input
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                                                    />
                                                    <span onClick={toggleShowPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                    </span>
                                                </div>
                                                {errors.password && touched.password && (
                                                    <div className="text-red-600 text-sm pl-2">{errors.password}</div>
                                                )}
                                            </div>
                                            <div className='login_btns flex flex-col gap-3'>
                                                <div className='flex gap-1 justify-between'>
                                                    <div className='text-sm flex gap-1 items-center select-none'>
                                                        <input type="checkbox" id='remember'></input>
                                                        <label htmlFor='remember'>Remember for 30 days</label>
                                                    </div>
                                                    <Link to="/forgetpassword" className='text-sm text-indigo-500'>Forget password</Link>
                                                </div>
                                                <button type="submit" disabled={isSubmitting} className='bg-indigo-500  text-white p-2 rounded-md text-center mt-3 cursor-pointer hover:bg-main-color transition duration-300'>sign In</button>
                                                {/* <button type='button' className='flex gap-2 justify-center items-center border focus:outline-none p-2 rounded-md border-neutral-400 text'>
                                                    <FcGoogle className='text-xl' />
                                                    <span>Sign in with Google</span>
                                                </button> */}
                                            </div>
                                        </form>
                                    );
                                }}
                            </Formik>

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