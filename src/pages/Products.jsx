import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Products() {

    const [spinner, setSpinner] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setSpinner(true);
        fetch("https://dummyjson.com/products")
            .then(res => res.json())
            .then(data => {
                setSpinner(false)
                setProducts(data.products)
            })
    }, []);

    return (
        <>
            <Navbar />
            <section className='products'>
                <div className='container'>
                    <div className='products_item flex flex-wrap items-center'>
                        {
                            spinner ?
                                <button type="button" className="flex gap-5 w-full text-center p-20 text-indigo-500 justify-center items-center text-4xl" disabled>
                                    <BiLoaderAlt className='animate-spin' />
                                    <span>Loading...</span>
                                </button>
                                :
                                products.map((item) => {
                                    return (
                                        <div className='flex w-1/4 py-5 pr-1 select-none' key={item.id}>
                                            <div className="card_item p-6 flex flex-col rounded border hover:shadow-xl transition">
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
                                })
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Products