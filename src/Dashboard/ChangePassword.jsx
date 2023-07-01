import React, { useState } from 'react'
import { API_URL } from '../App'
import { Formik } from 'formik/dist';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import SideNav from './AdminDashboard/SideNav';
import { useSelector } from 'react-redux';
import AdminNavbar from './Admin/AdminNavbar';
import { Link } from 'react-router-dom';

function ChangePassword() {
    const authUser = useSelector(x => x.auth.user);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [result, setResult] = useState(null);
    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const [showNewPassword, setShowNewPassword] = useState(false);
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    // start initializing validation
    const InitialValues = {
        oldPassword: "",
        newPassword: ""
    };
    const permisson = Yup.string()
        .required("password is required")
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol');

    const validationSchema = Yup.object().shape({
        oldPassword: permisson,
        newPassword: permisson
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }
        fetch(`${API_URL}/Account/changePassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        toast.success("Your password has been updated");
                        setSubmitting(false);
                        break;
                    case 401:
                        toast.error("Unauthorized: please log in again");
                        break;
                    case 404:
                        toast.error("User not found");
                        break;
                    default:
                        toast.error("Old Password is invalid");
                        break;
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("An error occurred. Please try again later.");
            });
    }

    return (
        <div>
            <div className={`relative w-full pb-16`}>
                <div className='h-80 profile_bg'>
                    <AdminNavbar />
                </div>
                <div className='container'>
                    <div className='p-5 details_side'>
                        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md m-auto sm:p-8">
                            <h2 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                                Change Password
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
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Old Password</label>
                                                <div className='relative select-none'>
                                                    <input type={showOldPassword ? 'text' : 'password'}
                                                        value={values.oldPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="oldPassword" id="oldPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 " />
                                                    <span onClick={toggleShowOldPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                        {showOldPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                    </span>
                                                </div>
                                                {errors.oldPassword && touched.oldPassword && (
                                                    <div className="text-red-600 text-sm pl-2 select-none">{errors.oldPassword}</div>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                                <div className='relative select-none'>
                                                    <input type={showNewPassword ? 'text' : 'password'}
                                                        value={values.newPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="newPassword" id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 " />
                                                    <span onClick={toggleShowNewPassword} className='absolute cursor-pointer top-1/2 right-2 text-main-color text-xl -translate-x-1/2 -translate-y-1/2 flex' >
                                                        {showNewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                    </span>
                                                </div>
                                                {errors.newPassword && touched.newPassword && (
                                                    <div className="text-red-600 text-sm pl-2 select-none">{errors.newPassword}</div>
                                                )}
                                            </div>
                                            <div className='flex gap-1 justify-end'>

                                                <Link to="/forgetpassword" className='text-sm text-indigo-500'>Forget password</Link>
                                            </div>
                                            <button type="submit" disabled={isSubmitting} className="w-full text-white bg-main-color hover:bg-main-color font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Change password</button>
                                        </form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangePassword