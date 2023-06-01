import React, { useState } from 'react'
import { Formik } from 'formik/dist';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../App';
import SideNav from './SideNav';
import { useSelector } from 'react-redux';

const AddRole = () => {
    const [open, setOpen] = useState(true);
    const authUser = useSelector(x => x.auth.user);

    // start initializing validation
    const InitialValues = {
        roleName: ""
    };
    const validationSchema = Yup.object().shape({
        roleName: Yup.string().required("role is Required")
    })
    const handleSubmit = async (values, { setSubmitting }) => {
        fetch(`${API_URL}/DashboardUser/AddRole?roleName=${values.roleName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            }
        })
            .then(response => response.text())
            .then((data) => {
                if (data === `Role '${values.roleName}' already exists.`) {
                    toast.error(`Role (${values.roleName}) already exists`);
                } else {
                    toast.success(`You added new role (${values.roleName})`);
                }
            })
        setSubmitting(false);
    }
    return (

        <div className='flex'>
            <div className={` ${open ? "w-1/5" : "w-20 "} bg-main-color h-screen p-5  pt-8 relative duration-300`}>
                <SideNav open={open} setOpen={setOpen} />
            </div>
            <div className='p-5 w-4/5'>
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md m-auto sm:p-8">
                    <h2 className="mb-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        Add New Role
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
                                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Your Role</label>
                                        <input type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.roleName}
                                            name="roleName" id="role"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1"
                                            placeholder="admin" />
                                        {errors.roleName && touched.roleName && (
                                            <div className="text-red-600 text-xs pl-2">{errors.roleName}</div>
                                        )}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full text-white bg-main-color hover:bg-main-color font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add Role</button>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddRole