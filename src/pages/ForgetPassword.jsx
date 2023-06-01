import React, { useState } from 'react'
import { FaOpencart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { API_URL } from '../App'
import { Formik } from 'formik/dist';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    // start initializing validation
    const InitialValues = {
        email: ""
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is Required")
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        fetch(`${API_URL}/Account/emailexists?email=${values.email}`)
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    const email = { email: values.email }
                    fetch(`${API_URL}/Account/forgetPassword`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(email)
                    })
                    toast.success(`Check your email "${values.email}"`);
                    setSubmitting(false);
                } else {
                    toast.error("email Not exists");
                    setSubmitting(false);
                }
            })


    }

    return (
        <section className="bg-gray-50 forget_password">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <Link to="/" className='flex items-center gap-2 text-white bg-main-color py-4 px-3 rounded-md mb-6'>
                    <FaOpencart className='text-3xl bg-white text-main-color p-1 rounded-full' />
                    <span className='logo_icon text-xl'>Nova</span>
                </Link>
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                    <h2 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        Forget Password
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
                                <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                        <input type="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            name="email" id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1"
                                            placeholder="name@company.com" />
                                        {errors.email && touched.email && (
                                            <div className="text-red-600 text-xs pl-2">{errors.email}</div>
                                        )}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full text-white bg-main-color hover:bg-main-color font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Reset password</button>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default ForgetPassword