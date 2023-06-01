import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaOpencart } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { API_URL } from '../App';
import * as Yup from 'yup';
import { Formik } from 'formik/dist';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const navigate = useNavigate();
    // get email and token from url
    const [queryParameters] = useSearchParams()
    const email = queryParameters.get("Email")
    const token = queryParameters.get("Token")
    // start initializing validation
    const InitialValues = { password: "", confirmPassword: "" };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("password is required")
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });


    const handleSubmit = async (values, { setSubmitting }) => {
        setTimeout(() => {
            const data = { ...values, email, token };
            fetch(`${API_URL}/Account/resetpassword`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setSubmitting(false);
            toast.success('password changed');
            navigate("/login")
        }, 500);
    }

    return (
        <section className="bg-gray-50 reset_password">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className='flex items-center gap-2 text-white bg-main-color py-4 px-3 rounded-md mb-6'>
                    <FaOpencart className='text-3xl bg-white text-main-color p-1 rounded-full' />
                    <span className='logo_icon text-xl'>Nova</span>
                </Link>
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                    <h2 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        Change Password
                        <p className='text-sm block text-gray-600'>For <span className='text-main-color underline'>{email && email}</span> </p>
                    </h2>
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
                                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 select-none" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                        <div className='relative'>
                                            <input type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 " />
                                            <span onClick={toggleShowPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                            </span>
                                        </div>
                                        {errors.password && touched.password && (
                                            <div className="text-red-600 text-sm pl-2">{errors.password}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                        <div className='relative'>
                                            <input type={showConfirmPassword ? 'text' : 'password'}
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 " />
                                            <span onClick={toggleShowConfirmPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                            </span>
                                        </div>
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className="text-red-600 text-sm pl-2">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full text-white bg-main-color hover:bg-main-color font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset password</button>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword