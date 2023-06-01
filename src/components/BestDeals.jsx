import React from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/products-slice';
import { addToCart } from '../redux/slices/cart-slice';

function BestDeals(props) {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProducts(""));
    }, []);

    return (
        <>
            <section className='cards pb-20'>
                <div className='container'>
                    <h3 className='text-3xl font-semibold text-neutral-900 py-5'>{props.title}</h3>
                    <div className="cards_items flex flex-wrap gap-5">
                        <div className="flex flex-wrap w-full">
                            {
                                products.data && products.data.slice(0, 4).map((item) => {
                                    return (
                                        <div className='flex w-full sm:w-1/2 md:w-1/4 py-5 pr-1 select-none' key={item.id}>
                                            <div className="card_item p-6 flex flex-col rounded border hover:shadow-xl transition cursor-grab">
                                                <Link to={`/details/${item.id}?search=${item.productType.replace(" ", '')}`} className="cursor-pointer">
                                                    <img src={item.pictureUrl} alt={`image-${item.name}`} className="h-96 mx-auto" />
                                                    <span className='block my-2 text-sm text-white rounded-md w-max py-1 px-2 bg-main-color'>{item.productBrand}</span>
                                                    <h4 className="card_item-name font-medium text-xl my-1">{item.name}</h4>
                                                    <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                                </Link>
                                                <div>
                                                    <span className='inline-block w-max text-lg font-medium'>{item.price}.00 </span>
                                                    <span className='text-sm'> USD</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Link to={`/details/${item.id}?search=${item.productType.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BestDeals