import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const BestBrands = () => {

    const [brand, setBrand] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/Products/brands`)
            .then(response => response.json())
            .then(brands => {
                setBrand(brands)
            });
    }, [])

    return (
        <section className='brand py-10 bg-zinc-50'>
            <div className='container'>
                <div className="flex items-center justify-between py-3">
                    <h3 className='text-3xl font-semibold text-neutral-900 mb-6'>Products by Brand</h3>
                    <Link to="/brand" className="hover:text-main-color transition duration-300">All Brands <BsBoxArrowUpRight className="inline-block mx-1" /> </Link>
                </div>
                <div className="brand_items flex flex-wrap gap-2">
                    {
                        brand ? brand.slice(7, 15).map((item) => {
                            return (
                                <Link to={`/brand/${item.id}?name=${item.name}`} className="brand_item bg-white" key={item.id}>
                                    <div className="flex gap-3 py-5 justify-center items-center border border-white hover:border-main-color rounded transition cursor-pointer" key={item.id}>
                                        <div className="h-24 w-24 rounded-full border flex justify-center items-center border-neutral-300 p-2 overflow-hidden">
                                            <img src={item.pictureUrl} alt={item.id} className="" />
                                        </div>
                                        <div className='flex gap-2 flex-col'>
                                            <h5 className="brand_item-name font-bold capitalize text-main-color">{item.name}</h5>
                                            <span className='text-sm text-neutral-600'>Delivery with in 24 hours</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                            :
                            (`<h1 className='text-2xl bg-red-300'>Loading from DB</h1>`)
                    }
                </div>
            </div>
        </section>
    )
}

export default BestBrands