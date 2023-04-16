import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Products() {
    const [currentPage, setCurrentPage] = useState(1);

    const [spinner, setSpinner] = useState(false);
    const [products, setProducts] = useState([]);
    let [count, setCount] = useState(0);
    useEffect(() => {
        setSpinner(true);
        fetch(`${API_URL}/Products?PageIndex=${currentPage}&PageSize=8`)
            .then(res => res.json())
            .then(data => {
                setSpinner(false)
                setProducts(data.data)
                console.log(data);
                setCount(data.count)
            })
    }, [currentPage]);

    return (
        <>
            <Navbar />
            <section className='products'>
                <div className='container'>
                    <h3 className='text-2xl py-5 mt-5'>Your search get {count} products</h3>
                    <div className='products_item flex flex-wrap items-center'>
                        {
                            spinner ?
                                <button type="button" className="flex gap-5 w-full text-center p-20 text-main-color justify-center items-center text-4xl" disabled>
                                    <BiLoaderAlt className='animate-spin' />
                                    <span>Loading...</span>
                                </button>
                                :
                                products.map((item) => {
                                    return (
                                        <div className='flex w-full sm:w-1/2 md:w-1/4 py-5 pr-1 select-none' key={item.id}>
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
                                                    <Link to={`/details/${item.id}?search=${item.productType.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
                <div className='container justify-center flex gap-4 w-full '>
                    {
                        currentPage <= 1 ?
                            <button onClick={() => setCurrentPage(currentPage - 1)} className='my-8 cursor-pointer rounded-md px-5 p-2 bg-main-color opacity-50 mt-4 text-white text-sm capitalize text-center' disabled>Previous</button>
                            : <button onClick={() => setCurrentPage(currentPage - 1)} className='my-8 cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>Previous</button>
                    }
                    {
                        products.length <= 7 ?
                            <button onClick={() => setCurrentPage(currentPage + 1)} className='my-8 cursor-pointer rounded-md px-5 p-2 bg-main-color opacity-50 mt-4 text-white text-sm capitalize text-center' disabled>Next</button>
                            : <button onClick={() => setCurrentPage(currentPage + 1)} className='my-8 cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>Next</button>
                    }

                </div>
            </section>
            <Footer />
        </>
    )
}

export default Products