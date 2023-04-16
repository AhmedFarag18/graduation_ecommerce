import React from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../App';


function Recommended({ title, search }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/Products?Search=${search}`)
            .then((res) => res.json())
            .then((product) => {
                setProducts(product.data);
            })
    }, []);
    // console.log(products);
    return (
        <>
            {
                products.length ?
                    <section className='cards pb-20'>
                        <div className='container'>
                            <h3 className='text-3xl font-semibold text-neutral-900 py-5'>{title}</h3>
                            <div className="cards_items flex flex-wrap gap-0">

                                {products.map((item) => {
                                    return (
                                        <div className='flex max-sm:w-full max-md:w-1/2 w-1/4 py-5 px-2 select-none' key={item.id}>
                                            <div className="card_item w-full p-6 flex flex-col rounded border hover:shadow-xl transition cursor-grab">
                                                <Link to={`/details/${item.id}?search=${item.productType.replace(" ", '')}`} className="cursor-pointer">
                                                    <img src={item.pictureUrl} alt={`image-${item.id}`} className="h-52 w-full" />
                                                    <span className='block my-2 text-sm text-white rounded-md w-max py-1 px-2 bg-main-color'>{item.productBrand}</span>
                                                    <h4 className="card_item-name font-medium text-xl my-1">{item.name}</h4>
                                                    <p className='card_item-desc text-sm my-2'>{item.description}</p>
                                                </Link>
                                                <div>
                                                    <span className='inline-block w-max text-lg font-medium'>{item.price}.00 </span>
                                                    <span className='text-sm'> USD</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <Link to={`/details/${item.id}?search=${item.productType.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section> : null
            }
        </>
    )
}

export default Recommended