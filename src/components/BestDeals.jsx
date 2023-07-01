import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../assets/css/mainslider.css";
import { API_URL } from '../App'

function BestDeals({ title, query }) {
    const [products, setProducts] = useState();
    useEffect(() => {
        fetch(`${API_URL}/Products${query}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data);
            })
    }, []);

    return (
        <>
            <section className='cards pb-20'>
                <div className='container'>
                    <h3 className='text-3xl font-semibold text-neutral-900 py-5'>{title}</h3>
                    <div className="cards_items flex flex-wrap gap-5">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            slidesPerView={4}
                            navigation={true}
                            // loop={true}
                            // parallax={true}
                            keyboard={{ enabled: true }}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            breakpoints={{
                                // when window width is >= 220px
                                220: {
                                    slidesPerView: 1,
                                },
                                // when window width is >= 480px
                                480: {
                                    slidesPerView: 2,
                                },
                                // when window width is >= 991px
                                991: {
                                    slidesPerView: 3,
                                },
                                // when window width is >= 1200px
                                1200: {
                                    slidesPerView: 4,
                                }
                            }}
                            // className="h-auto cursor-pointer select-none m-auto max-md:w-full md:rounded-lg"
                            className="flex flex-wrap w-full">
                            {
                                products && products.map((item) => {
                                    return (
                                        <SwiperSlide className='flex w-full sm:w-1/2 md:w-1/4 py-5 pr-1 select-none' key={item.id}>
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
                                        </SwiperSlide>
                                    )
                                })}
                        </Swiper>
                    </div>
                </div>
            </section >
        </>
    )
}

export default BestDeals