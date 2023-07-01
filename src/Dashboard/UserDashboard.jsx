import React, { useEffect, useState } from 'react'
import AdminNavbar from './Admin/AdminNavbar';
import profileImg from './../assets/images/team/member-2.jpg'
import { useSelector } from 'react-redux';
import { API_URL } from '../App';
import { BiEdit, BiRightArrowAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';

function UserDashboard() {
    const authUser = useSelector(x => x.auth.user);
    const [email, setEmail] = useState('');


    // get changed values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        // ----------- Get Account Details -----------
        fetch(`${API_URL}/Account`, {
            headers: {
                Authorization: `Bearer ${authUser.token}`
            }
        }).then((response) => response.json())
            .then(data => {
                setDisplayName(data.displayName)
                setPhoneNumber(data.phoneNumber)
                setEmail(data.email)
            })
        // ----------- get addresses Data -----------
        fetch(`${API_URL}/Account/address`, {
            headers: {
                Authorization: `Bearer ${authUser.token}`
            }
        }).then((response) => response.json())
            .then(addressData => {
                setFirstName(addressData.firstName)
                setLastName(addressData.lastName)
                setCity(addressData.city)
                setCountry(addressData.country)
                setStreet(addressData.street)
            })
    }, [])

    const handleSave = async (e) => {
        e.preventDefault();

        const updateAddressInfo = {
            firstName, lastName, country, city, street
        }
        console.log(updateAddressInfo);
        await fetch(`${API_URL}/Account/address`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            },
            body: JSON.stringify(updateAddressInfo)
        })
        const updateUserInfo = {
            displayName, phoneNumber
        }
        console.log(updateUserInfo);
        await fetch(`${API_URL}/Account/UpdateUser`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            },
            body: JSON.stringify(updateUserInfo)
        })
        toast.success("Info updated successfully")
    }

    return (
        <div className={`relative w-full pb-16`}>
            <div className='h-80 profile_bg'>
                <AdminNavbar />
            </div>
            <div className='container'>
                <div className='relative bg-main-color -mt-24 rounded-lg'>
                    <div className='absolute top-0 right-0 bg-gray-100 shadow-sm rounded-full text-xl w-10 h-10 flex justify-center cursor-pointer items-center -mt-2 -mr-2 z-10 hover:bg-indigo-500 hover:text-white transition-colors duration-300'>
                        <BiEdit />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='flex justify-center items-center w-full -mt-12'>
                            <span className='flex justify-center items-center w-20 h-20 rounded-full border-4 border-main-color text-2xl bg-white text-indigo-500'>{authUser.displayName.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <form className='py-3 -mt-3 w-full' onSubmit={handleSave}>
                            <div className='mb-5 text-center'>
                                <h3 className='text-base max-sm:text-sm text-white'>{email}</h3>
                            </div>
                            {/* start updated inputs */}
                            <div className='flex flex-wrap w-full p-6 gap-5'>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="displayName" className="block mb-2 text-sm font-medium text-white">Display Name</label>
                                    <input type="text"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        value={displayName}
                                        name="displayName" id="displayName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-white">First Name</label>
                                    <input type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstName}
                                        name="firstName" id="firstName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-white">Last Name</label>
                                    <input type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastName}
                                        name="lastName" id="lastName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-white">Your phone Number</label>
                                    <input type="text"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                        name="phoneNumber" id="phoneNumber"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-white">Country</label>
                                    <input type="text"
                                        onChange={(e) => setCountry(e.target.value)}
                                        value={country}
                                        name="country" id="country"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-white">City</label>
                                    <input type="text"
                                        onChange={(e) => setCity(e.target.value)}
                                        value={city}
                                        name="city" id="city"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                                <div className='profile_details max-md:w-full'>
                                    <label htmlFor="street" className="block mb-2 text-sm font-medium text-white">Street</label>
                                    <input type="text"
                                        onChange={(e) => setStreet(e.target.value)}
                                        value={street}
                                        name="street" id="street"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded block w-full p-2.5 focus:outline-none focus:ring-1"
                                    />
                                </div>
                            </div>
                            <div className='mt-5 flex justify-center items-center p-4 max-sm:flex-col'>
                                <button type='submit'
                                    className='flex items-center gap-2 p-4 mb-4 bg-blue-50 text-main-color rounded '>
                                    <span className='font-medium text-sm'>save</span>
                                    <BiRightArrowAlt className='text-lg' />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard