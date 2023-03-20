import React from 'react'
import { useState, useEffect } from 'react';
import { BsCart } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

function DetailsProduct({ productID }) {

    let navigate = useNavigate();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productID}`)
            .then((res) => res.json())
            .then((product) => {
                setProduct(product);
            })
    }, [productID])

    const changeMainImg = (e) => {
        document.querySelector(".main_img img").src = e.target.src;
    }

    return (
        <div className='product_details py-10'>
            <div className='container'>
                <Link onClick={() => navigate(-1)} className="text-white bg-indigo-600 hover:bg-indigo-700 inline-block  font-medium rounded text-sm px-5 py-2.5">Back</Link>
                <div className='product-details flex justify-between flex-col md:flex-row pt-5'>
                    <div className='product-image w-full  md:w-1/2 py-5 flex gap-2 select-none bg-gray-50 rounded p-5'>
                        <div className='all_images w-2/12 flex flex-col gap-3'>
                            {
                                product.images && product.images.map((img, idx) => {
                                    return <div key={idx} className="border p-1 rounded cursor-pointer">
                                        <img src={img} alt={idx} onClick={(e) => { changeMainImg(e) }}></img>
                                    </div>
                                })
                            }
                        </div>
                        <div className='main_img w-10/12'>
                            <img src={product.thumbnail} className="w-full mb-10 h-80" alt={product.id} />
                        </div>
                    </div>
                    <div className='product-data w-full md:w-1/2 p-5'>
                        <h2 className='text-3xl md:text-4xl'>{`${product.title}`}</h2>
                        <div className='flex items-center gap-1.5 mt-2 bg-gray-50 shadow-sm rounded py-1 px-3 w-max'>
                            <FaStar className=" text-yellow-400" />
                            <span>{product.rating}</span>
                        </div>
                        <div className='mt-6 flex flex-col'>
                            <b className='text-neutral-800'>Description</b>
                            <span className='text-neutral-600'>{product.description}</span>
                        </div>
                        <div className='mt-4 text-sm'>
                            <p><span className='text-neutral-700'>Availability: </span><span className='font-semibold'>{product.stock >= 1 ? `In Stock` : "Out of stock"}</span></p>
                            <p><span className='text-neutral-700'>Brand: </span> <span className='font-semibold'>{product.brand}</span></p>
                        </div>
                        <div className='mt-6 flex items-center'>
                            <span className='font-bold text-xl'>${product.price}</span>
                            <span className='text-sm ml-2 text-neutral-500 rounded px-2 py-1 bg-gray-100'>  Discount: ${product.discountPercentage}</span>
                        </div>
                        <div className='flex gap-3 mt-6 w-full flex-wrap'>
                            <input type="number" min="1" className='p-2 border focus:outline-none text-neutral-600 rounded' defaultValue={1} />
                            <button className='flex items-center gap-2 py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded group'>
                                <BsCart className='group-hover:animate-bounce' />
                                <span> Add to cart</span>
                            </button>
                            <button className='py-2 px-10 border text-neutral-600 rounded hover:bg-indigo-600 hover:text-white ease-in duration-300'>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsProduct