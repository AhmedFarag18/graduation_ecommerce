import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { BiLoaderAlt } from "react-icons/bi"
import { API_URL } from '../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BrandItem() {
    let brandName = window.location.search.slice(6).replace("%20", " ").replace("%27", "'");
    const { brandId } = useParams();

    const [BrandProducts, setBrandProducts] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setSpinner(true);
        fetch(`${API_URL}/products/products?brandId=${brandId}`)
            .then(res => res.json())
            .then(data => {
                setSpinner(false);
                setBrandProducts(data.data);
            })
    }, [])

    return (
        <>
            <Navbar />
            <div className='brand_item_details'>
                <div className='container flex justify-center items-center flex-col h-full'>
                    <h2 className='text-base pt-10 text-white'>
                        <Link to="/brand">Brand</Link>
                        <span> / </span>
                        <Link to={`/brand/${brandId}`} className='text-main-color'>{brandName}</Link>
                    </h2>
                    <p className='text-4xl text-white mt-10'>Explore {brandName} Products</p>
                </div>
            </div>
            <div className='container'>
                <div className='py-10 flex flex-wrap gap-3'>
                    {
                        spinner ?
                            <button type="button" className="flex gap-5 w-full text-center p-20 text-main-color justify-center items-center text-4xl" disabled>
                                <BiLoaderAlt className='animate-spin' />
                                <span>Loading...</span>
                            </button>
                            :
                            BrandProducts.map(item => {
                                return (
                                    <div className="brand_item_products p-6 flex flex-col rounded border hover:shadow-xl transition cursor-grab" key={item.id}>
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
                                )
                            })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BrandItem