import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_URL } from '../App';

function Brand() {

    // const colors = ["#c6b293", "#b05747", "#6f9b82", "#3caf74", "#f4afb2", "#faba59"];
    const colors = ["border-red-200", "border-indigo-200", "border-orange-200", "border-teal-200", "border-yellow-200", "border-neutral-200", "border-slate-200", "border-green-200", "border-lime-200"];

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch(`${API_URL}/Products/brands`)
            .then((res) => res.json())
            .then((data) => {
                setBrands(data);
            })
    }, [])

    return (
        <>
            <Navbar />
            <section className='brand py-10 bg-zinc-50'>
                <div className='container'>
                    <div className="flex items-center justify-between py-3">
                        <h3 className='text-3xl font-semibold text-neutral-900 mb-6'>Explore Our Brands</h3>
                    </div>
                    <div className="brand_items flex flex-wrap gap-2">
                        {
                            brands ? brands.map((item) => {
                                return (
                                    <Link to={`/brand/${item.id}?name=${item.name}`} className="brand_item bg-white" key={item.id}>
                                        <div className="flex gap-3 py-5 justify-center items-center border border-gray-100 hover:border-main-color rounded transition cursor-pointer" key={item.id}>
                                            <div className={`h-24 w-24 rounded-full border flex justify-center items-center ${colors[Math.floor(Math.random() * colors.length)]} border-2 p-2 overflow-hidden bg-white`}>
                                                <img src={item.pictureUrl} alt={item.name} className="rounded" />
                                            </div>
                                            <div className='flex gap-2 flex-col'>
                                                <h5 className="brand_item-name font-bold capitalize text-main-color">{item.name}</h5>
                                                <span className='text-sm text-neutral-600'>Explore Our Brand Products </span>
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
            <Footer />
        </>
    )
}

export default Brand