import React from 'react'
import { toast } from 'react-hot-toast';
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux';

function ShippingAddress({ setOpenTab, values, touched, errors, handleChange, handleBlur, isSubmitting }) {
    const dispatch = useDispatch();
    return (
        <>
            <div className='p-5 mb-5'>
                <h4 className='text-2xl text-neutral-900 my-5 font-semibold'>Shipping information</h4>
                <div className='flex gap-2 w-full pl-5'>
                    <div className='my-4 flex flex-col gap-1  w-1/2'>
                        <label className="font-medium text-base text-neutral-700" htmlFor="firsName">First Name</label>
                        <input
                            id='firsName'
                            name="firstName"
                            type="text"
                            placeholder="John"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                        />
                        {errors.firstName && touched.firstName && (
                            <div className="text-red-600 text-sm pl-2">{errors.firstName}</div>
                        )}
                    </div>
                    <div className='my-4 flex flex-col gap-1  w-1/2'>
                        <label className="font-medium text-base text-neutral-700" htmlFor="lastName">Last Name</label>
                        <input
                            id='lastName'
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                        />
                        {errors.lastName && touched.lastName && (
                            <div className="text-red-600 text-sm pl-2">{errors.lastName}</div>
                        )}
                    </div>
                </div>
                <div className='flex gap-2 w-full pl-5'>
                    <div className='my-4 flex flex-col gap-1  w-1/2'>
                        <label className="font-medium text-base text-neutral-700" htmlFor="country">country</label>
                        <input
                            id='country'
                            name="country"
                            type="text"
                            placeholder="Egypt"
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                        />
                        {errors.country && touched.country && (
                            <div className="text-red-600 text-sm pl-2">{errors.country}</div>
                        )}
                    </div>

                </div>
                <div className='flex gap-2 w-full pl-5'>
                    <div className='my-4 flex flex-col gap-1  w-1/2'>
                        <label className="font-medium text-base text-neutral-700" htmlFor="city">city</label>
                        <input
                            id='city'
                            name="city"
                            type="text"
                            placeholder="cairo"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                        />
                        {errors.city && touched.city && (
                            <div className="text-red-600 text-sm pl-2">{errors.city}</div>
                        )}
                    </div>
                    <div className='my-4 flex flex-col gap-1  w-1/2'>
                        <label className="font-medium text-base text-neutral-700" htmlFor="street">street or state</label>
                        <input
                            id='street'
                            name="street"
                            type="text"
                            placeholder="1234 NW Bobcat Lane"
                            value={values.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className='p-2 pl-3 text-neutral-600 font-normal w-full rounded-md focus:outline-none focus:ring-1 border'
                        />
                        {errors.street && touched.street && (
                            <div className="text-red-600 text-sm pl-2">{errors.street}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className='buttons_step flex justify-end items-center'>
                <button className={"text-base uppercase p-4 shadow hover:shadow-lg transition duration-200 rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                    onClick={(e) => {
                        e.preventDefault()
                        if (values.firstName == "" || values.lastName == "" || values.country == "" || values.city == "" || values.state == "" || values.street == "") {
                            setOpenTab(1)
                            toast.error('Add all input is required')
                        } else {
                            setOpenTab(2);
                            console.log(values)
                        }
                    }}>
                    Next <FaArrowAltCircleRight className="text-2xl mr-1" />
                </button>
            </div>
        </>
    )
}

export default ShippingAddress