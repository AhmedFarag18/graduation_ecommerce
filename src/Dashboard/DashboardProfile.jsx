import React, { useEffect, useState } from 'react'
import unknownImg from "../assets/images/unknown.jpg"
import gradient from "../assets/images/bg/gradient.jpg"
import { API_URL } from '../App'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import TopNav from '../components/TopNav'
import { LazyLoadImage } from 'react-lazy-load-image-component'
function DashboardProfile() {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const queryParameters = new URLSearchParams(window.location.search)
    const userProfile = queryParameters.get("user")
    const [loader, setLoader] = useState(true);
    const [userProducts, setUserProdcuts] = useState([]);

    useEffect(() => {
        if (userProfile !== "nova") {
            setLoader(true)
            fetch(`${API_URL}/DashboardUser/productOwner?productOwner=${userProfile}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserProdcuts(data)
                    setLoader(false)
                })
        } else {
            setLoader(true)
            fetch(`${API_URL}/products/novaProducts`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setUserProdcuts(data)
                    setLoader(false)
                })
        }
    }, [userProfile])


    return (
        <>
            <TopNav />
            <div className="mt-12 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full flex-col items-center bg-white bg-cover bg-clip-border p-[16px]">
                <div className="relative mt-1 flex h-64 w-full justify-center rounded-xl bg-cover bg_profile_page" style={{ backgroundImage: `url(${gradient})` }}>
                    <div className="absolute top-8 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                        <LazyLoadImage className="h-full w-full rounded-full" src={unknownImg} alt="profile" />
                    </div>
                    <div className='mt-24 w-full text-center px-5 py-8 rounded text-white'>
                        <h3 className='font-semibold'>{userProducts.email}</h3>
                        <Link to={"/dashboard"} className='my-3 inline-block cursor-pointer rounded-md px-5 p-2 bg-white text-main-color mt-4 text-sm capitalize'>Edit Details</Link>
                    </div>
                </div>
                <div className='w-full flex flex-col'>
                    <Link to={"/dashboard/profile/add"} className='mt-8 mb-3 inline-block w-fit cursor-pointer rounded-md px-5 p-2 text-white bg-main-color capitalize'>Add New Product</Link>
                    <hr className='bg-main-color w-full' />
                </div>

            </div>
            <div className='w-full p-4 flex flex-wrap mt-6 py-8'>
                {
                    loader ? <Loader />
                        :
                        userProducts.products ? userProducts.products.map(item => {
                            return (
                                <div className='flex w-full sm:w-1/2 md:w-1/3 py-5 pr-1 select-none' key={item.id}>
                                    <div className="card_item p-6 flex flex-col rounded border hover:shadow-xl transition cursor-grab">
                                        <LazyLoadImage src={item.pictureUrl} alt={`image-${item.name}`} className="h-96 mx-auto" />
                                        <div className='flex justify-between items-center'>
                                            <span className='block my-2 text-sm text-main-color rounded-md w-max py-1 px-2 bg-gray-200'>{item.productBrand}</span>
                                            <Link to={`/profile?user=${item.productOwner}`} className="cursor-pointer">
                                                <span className={`w-8 h-8 text-sm text-white rounded-full py-1 px-2 ${item.productOwner === "nova" ? "bg-main-color" : "bg-indigo-500"} flex justify-center items-center`}>{item.productOwner.slice(0, 1).toUpperCase()}</span>
                                            </Link>
                                        </div>
                                        <h4 className="card_item-name font-medium text-xl my-1">{item.name}</h4>
                                        <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                        <div>
                                            <span className='inline-block w-max text-lg font-medium'>{item.price} </span>
                                            <span className='text-sm'> USD</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Link to={`/dashboard/profile/edit/${item.id}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>Edit</Link>
                                            <Link to={`/dashboard/profile/delete/${item.id}`} className='cursor-pointer rounded-md px-5 p-2 bg-red-600 mt-4 text-white text-sm capitalize text-center'>Delete</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className='text-xl'>You don't have any products</div>
                }
            </div>
        </>
    )
}

export default DashboardProfile