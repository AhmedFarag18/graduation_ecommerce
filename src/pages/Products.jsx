import React, { useEffect, useState } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import NavbarSearchHook from '../redux/NavbarSearchHook';
import Pagination from '../components/Pagination';
import { getAllProducts } from '../redux/slices/products-slice';

function Products() {


    const [spinner, setSpinner] = useState(false);
    const [products, setProducts] = useState([]);

    const [onChangeSearch, searchWord, currentPage, totalPages, count, setCount, handlePageChange, pageSize, onChangeBrandId, brandId, onChangeTypeId, typeId] = NavbarSearchHook();
    const dispatch = useDispatch();
    const final = useSelector((state) => state.products);

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

    useEffect(() => {
        setSpinner(true)

        if (final) {
            setProducts(final.data);
            setCount(final.count);
            setSpinner(false)
        }
    }, [final])


    return (
        <>
            <Navbar />
            <section className='products flex container gap-2'>
                <div className='w-1/5 my-3 bg-gray-50 rounded'>
                    <div className='p-3'>
                        <h4 className='font-bold my-2'>Filter by types</h4>
                        {
                            types.map(item => {
                                return <ul key={item.id} className='px-2'>
                                    <li className='flex gap-2'>
                                        <input id={`${item.name}`} value={item.id} onChange={onChangeTypeId} type='radio' name='type' />
                                        <label htmlFor={`${item.name}`}>{item.name}</label>
                                    </li>
                                </ul>
                            })
                        }
                        <h4 className='font-bold my-2'>Filter by brands</h4>
                        {
                            brands.map(item => {
                                return <ul key={item.id} className='px-2'>
                                    <li className='flex gap-2'>
                                        <input id={`${item.name}`} value={item.id} onChange={onChangeBrandId} type='radio' name='brand' />
                                        <label htmlFor={`${item.name}`}>{item.name}</label>
                                    </li>
                                </ul>
                            })
                        }
                    </div>
                </div>
                <div className='container w-3/4'>
                    <div className='products_item flex flex-wrap items-center'>
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
                                    <button type="button" className="flex gap-5 w-full text-center p-20 text-main-color justify-center items-center text-4xl" disabled>
                                        <BiLoaderAlt className='animate-spin' />
                                        <span>Loading...</span>
                                    </button>
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