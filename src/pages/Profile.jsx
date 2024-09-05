import React, { useEffect, useState } from 'react'
import profileImg from "../assets/images/team/member-1.png"
import unknownImg from "../assets/images/unknown.jpg"
import gradient from "../assets/images/bg/gradient.jpg"
import TopNav from '../components/TopNav';
import { API_URL } from '../App';
import { IoLocationOutline } from 'react-icons/io5';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
function Profile() {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const queryParameters = new URLSearchParams(window.location.search)
    const userProfile = queryParameters.get("user")
    const [userDetails, setUserDetails] = useState([])
    const [loader, setLoader] = useState(true);
    const [novaProducts, setNovaProducts] = useState([]);

    useEffect(() => {
        if (userProfile !== "nova") {
            setLoader(true)
            fetch(`${API_URL}/DashboardUser/productOwner?productOwner=${userProfile}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setUserDetails(data)
                    setLoader(false)
                })
        } else {
            setLoader(true)
            fetch(`${API_URL}/products/novaProducts`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setNovaProducts(data)
                    setLoader(false)
                })
        }
    }, [userProfile])


    return (
        <>
            <TopNav />
            <div>
                <div className="shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full flex-col items-center bg-white bg-cover bg-clip-border p-[16px]">
                    <h2 className=" text-sm leading-3 text-gray-600 font-normal mb-2">
                        <Link to="/">Home </Link>
                        /
                        <Link to={`/profile?user=${userProfile}`} className='text-main-color'> Profile</Link>
                    </h2>
                    <div className="relative mt-1 flex h-64 max-md:h-32 w-full justify-center rounded-xl bg-cover bg_profile_page" style={{ backgroundImage: `url(${gradient})` }}>
                        <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                            <LazyLoadImage className="h-full w-full rounded-full" src={unknownImg} alt="profile" />
                        </div>
                    </div>
                    {
                        loader ? <Loader />
                            :
                            userProfile != "nova" ?
                                <>
                                    <div className="mt-16 flex flex-col items-center">
                                        <h4 className="text-main-color text-xl font-medium">{`${userDetails.address.firstName} ${userDetails.address.lastName}`}</h4>
                                        <p className="text-gray-500 text-base font-normal flex justify-between items-center gap-1 my-2">
                                            <IoLocationOutline className='text-xl text-main-color' />
                                            <span> {`${userDetails.address.country}, ${userDetails.address.city}, ${userDetails.address.street}`}</span>
                                        </p>
                                        <p className="text-gray-500 text-base font-normal flex justify-between items-center gap-1">
                                            <MdLocalPhone className='text-xl text-main-color' />
                                            <span> {`${userDetails.phoneNumber}`}</span>
                                        </p>
                                    </div>
                                    {
                                        user ? userProfile === user.email ?
                                            <Link to={`/dashboard/profile?user=${userProfile}`} className='flex my-3 p-3 bg-main-color text-white rounded'>Edit Profile</Link>
                                            : <Link className='flex items-center gap-2 my-3 p-3 bg-main-color text-white rounded'>
                                                <MdEmail className='text-xl' />
                                                <span>Message</span>
                                            </Link> :
                                            <Link className='flex items-center gap-2 my-3 p-3 bg-main-color text-white rounded'>
                                                <MdEmail className='text-xl' />
                                                <span>Message</span>
                                            </Link>
                                    }
                                    <hr className="w-11/12 mx-auto bg-main-color my-5" />
                                    <div className='w-full p-4 flex flex-wrap mt-6 py-8'>
                                        {
                                            userDetails.products.map((item) => {
                                                return (
                                                    <div className='flex w-full sm:w-1/2 md:w-1/3 py-5 pr-1 select-none' key={item.id}>
                                                        <div className="card_item w-full p-6 flex flex-col rounded border hover:shadow-xl transition">
                                                            <LazyLoadImage src={item.pictureUrl} alt={`image-${item.name}`} className="h-96 mx-auto" />
                                                            <div className='flex justify-between items-center'>
                                                                <span className='block my-2 text-sm text-main-color rounded-md w-max py-1 px-2 bg-gray-200'>{item.productBrand}</span>
                                                                <Link to={`/profile?user=${item.productOwner}`} className="cursor-pointer">
                                                                    <span className={`w-8 h-8 text-sm text-white rounded-full py-1 px-2 ${item.productOwner === "nova" ? "bg-main-color" : "bg-indigo-500"} flex justify-center items-center`}>{item.productOwner ? item.productOwner.slice(0, 1).toUpperCase() : ""}</span>
                                                                </Link>
                                                            </div>
                                                            <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className="cursor-pointer">
                                                                <h4 className="card_item-name font-medium text-xl my-1">{item.name}</h4>
                                                            </Link>
                                                            <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                                            <div>
                                                                <span className='inline-block w-max text-lg font-medium'>{item.price} </span>
                                                                <span className='text-sm'> USD</span>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mt-16 flex flex-col items-center">
                                        <h4 className="text-main-color text-xl font-medium">{"Nova"}</h4>
                                        <p className="text-gray-500 text-base font-normal flex justify-between items-center gap-1 my-2">
                                            <IoLocationOutline className='text-xl text-main-color' />
                                            <span> Egypt, Cairo, 12st maadi </span>
                                        </p>
                                        <p className="text-gray-500 text-base font-normal flex justify-between items-center gap-1">
                                            <MdLocalPhone className='text-xl text-main-color' />
                                            <span> 04428827</span>
                                        </p>
                                    </div>
                                    {
                                        user ? userProfile === user.email ?
                                            <Link to={`/dashboard/profile?user=${userProfile}`} className='flex my-3 p-3 bg-main-color text-white rounded'>Edit Profile</Link>
                                            : <Link className='flex items-center gap-2 my-3 p-3 bg-main-color text-white rounded'>
                                                <MdEmail className='text-xl' />
                                                <span>Message</span>
                                            </Link>
                                            : <Link className='flex items-center gap-2 my-3 p-3 bg-main-color text-white rounded'>
                                                <MdEmail className='text-xl' />
                                                <span>Message</span>
                                            </Link>
                                    }
                                    <hr className="w-11/12 mx-auto bg-main-color my-5" />
                                    <div className='w-full p-4 flex flex-wrap mt-6 py-8'>
                                        {
                                            novaProducts.data.map((item) => {
                                                return (
                                                    <div className='flex w-full sm:w-1/2 md:w-1/3 py-5 pr-1 select-none' key={item.id}>
                                                        <div className="card_item w-full p-6 flex flex-col rounded border hover:shadow-xl transition">
                                                            <LazyLoadImage src={item.pictureUrl} alt={`image-${item.name}`} className="h-96 mx-auto" />
                                                            <div className='flex justify-between items-center'>
                                                                <span className='block my-2 text-sm text-main-color rounded-md w-max py-1 px-2 bg-gray-200'>{item.productBrand}</span>
                                                                <Link to={`/profile?user=${item.productOwner}`} className="cursor-pointer">
                                                                    <span className={`w-8 h-8 text-sm text-white rounded-full py-1 px-2 ${item.productOwner === "nova" ? "bg-main-color" : "bg-indigo-500"} flex justify-center items-center`}>{item.productOwner.slice(0, 1).toUpperCase()}</span>
                                                                </Link>
                                                            </div>

                                                            <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className="cursor-pointer">
                                                                <h4 className="card_item-name font-medium text-xl my-1">{item.name}</h4>
                                                            </Link>
                                                            <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                                            <div>
                                                                <span className='inline-block w-max text-lg font-medium'>{item.price} </span>
                                                                <span className='text-sm'> USD</span>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile