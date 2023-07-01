import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import NavbarSearchHook from '../redux/NavbarSearchHook';
import Pagination from '../components/Pagination';
import { getAllProducts } from '../redux/slices/products-slice';
import { BsSliders } from 'react-icons/bs';
import { API_URL } from '../App';
import Loader from '../components/Loader';

function Products() {
    const [showFilters, setShowfilters] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [products, setProducts] = useState([]);

    const [onChangeSearch, searchWord, currentPage, totalPages, count, setCount, handlePageChange, pageSize, onChangeBrandId, brandId, onChangeTypeId, typeId] = NavbarSearchHook();
    const dispatch = useDispatch();
    const final = useSelector((state) => state.products);

    useEffect(() => {
        setSpinner(true)

        if (final) {
            setProducts(final.data);
            setCount(final.count);
            setSpinner(false)
        }
    }, [final])


    // get all brands  and types
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch(`${API_URL}/Products/brands`)
            .then(response => response.json())
            .then(brands => {
                setBrands(brands)
            });

        fetch(`${API_URL}/Products/types`)
            .then(response => response.json())
            .then(types => {
                setTypes(types)
            });
    }, []);

    return (
        <>
            <Navbar />
            {/* start filter */}
            <div className=" md:py-12 lg:px-20 md:px-6 py-9 px-4">
                <p className=" text-sm leading-3 text-gray-600 font-normal mb-2">Home / Products</p>
                <div className=" flex justify-between items-center mb-4">
                    <h2 className=" lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">All Products</h2>
                    {/*  filters Button (md and plus Screen) */}
                    <button onClick={() => setShowfilters(!showFilters)} className=" cursor-pointer sm:flex hover:bg-indigo-600 focus:ring-offset-2 py-4 px-6 bg-main-color flex text-base leading-4 font-normal text-white justify-center items-center  gap-2">
                        <BsSliders className='text-xl' />
                        Filters
                    </button>
                </div>
                <p className=" text-xl leading-5 text-gray-600 font-medium">{count} Products</p>
                {/* Filters Button (Small Screen)  */}
                <button onClick={() => setShowfilters(!showFilters)} className="cursor-pointer mt-6 sm:hidden hover:bg-indigo-600 focus:ring-offset-2 py-2 w-full bg-main-color flex text-base leading-4 font-normal text-white justify-center items-center gap-2">
                    <BsSliders className='text-xl' />
                    Filters
                </button>
            </div>

            {/* start products details */}
            <section className='products relative flex container gap-2'>
                <div id="filterSection" className={"absolute left-0 top-0  h-screen md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " + (showFilters ? "block" : "hidden")}>
                    <div className='filter_section'>
                        <div onClick={() => setShowfilters(false)} className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                            <svg className=" lg:w-6 lg:h-6 w-4 h-4" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 1L1 25" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 1L25 25" stroke="#27272A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className='p-3'>
                            <h4 className='lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800'>Filter by types</h4>
                            {
                                <ul className='flex flex-col md:space-x-6 mt-8 gap-y-8 flex-wrap md:grid md:grid-cols-6'>
                                    {types.map(item => {
                                        return <li key={item.id} className=" flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                                            <input id={`${item.name}`} value={item.id} onChange={onChangeTypeId} type='radio' name='type' />
                                            <label htmlFor={`${item.name}`} className='text-base leading-4 text-gray-600 font-normal'>{item.name}</label>
                                        </li>
                                    })
                                    }
                                </ul>
                            }
                            <hr className=" bg-gray-200 lg:w-8/12 w-full md:my-10 my-8" />
                            <h4 className='lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800'>Filter by brands</h4>
                            {
                                <ul className='flex flex-col md:space-x-6 mt-8 gap-y-8 flex-wrap md:grid md:grid-cols-6'>
                                    {brands.map(item => {
                                        return <li key={item.id} className=" flex space-x-2 md:justify-center md:items-center items-center justify-start ">
                                            <input id={`${item.name}`} value={item.id} onChange={onChangeBrandId} type='radio' name='brand' />
                                            <label htmlFor={`${item.name}`} className='text-base leading-4 text-gray-600 font-normal'>{item.name}</label>
                                        </li>
                                    })
                                    }
                                </ul>
                            }
                            <hr className=" bg-gray-200 lg:w-8/12 w-full md:my-10 my-8" />

                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='products_item flex flex-wrap items-center justify-center'>
                        {
                            final.count === 0 ? <h1 className='text-main-color flex gap-5 w-full text-center p-20 justify-center items-center text-4xl'>Not matched any data</h1>
                                : products ? products.map((item) => {
                                    return (
                                        <div className='flex w-full sm:w-1/2 md:w-1/3 py-5 pr-1 select-none' key={item.id}>
                                            <div className="card_item w-full p-6 flex flex-col rounded border hover:shadow-xl transition">
                                                <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className="cursor-pointer">
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
                                                    <Link to={`/details/${item.id}?search=${item.name.replace(" ", '')}`} className='cursor-pointer rounded-md px-5 p-2 bg-main-color mt-4 text-white text-sm capitalize text-center'>View Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                    :
                                    <Loader />
                        }
                    </div>

                    <div className='justify-center flex gap-4 w-full '>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Products