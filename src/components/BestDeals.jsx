import React from 'react'
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function BestDeals(props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${props.search}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, []);

    return (
        <>
            <section className='cards pb-20'>
                <div className='container'>
                    <h3 className='text-3xl font-semibold text-neutral-900 py-5'>{props.title}</h3>
                    <div className="cards_items flex flex-wrap gap-5">
                        <div
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 0
                                },
                                667: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                991: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 20
                                }
                            }}
                            className="flex flex-wrap">
                            {products.map((item) => {
                                return (
                                    <div
                                        className='flex w-full sm:w-1/2 md:w-1/4 py-5 pr-1 select-none' key={item.id}>
                                        <div className="card_item p-6 flex flex-col rounded border hover:shadow-xl transition cursor-grab">
                                            <Link to={`/details/${item.id}?search=${item.brand}`} className="cursor-pointer">
                                                <img src={item.thumbnail} alt={item.id} className="h-52 w-auto" />
                                                <span className='block my-2 text-sm text-white rounded-md w-max py-1 px-2 bg-indigo-500'>{item.brand}</span>
                                                <h4 className="card_item-name font-medium text-xl my-1">{item.title}</h4>
                                                <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                            </Link>
                                            <div>
                                                <span className='inline-block w-max text-lg font-medium'>{item.price}.00 </span>
                                                <span className='text-sm'> USD</span>
                                            </div>
                                            <div className='flex gap-2'>
                                                <Link to="" className='rounded-md px-5 p-2 bg-indigo-600 mt-4 text-white text-sm capitalize text-center'>Add to cart </Link>
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