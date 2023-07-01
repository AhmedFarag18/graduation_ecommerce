import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../App'
import CategorySideItem from '../components/CategorySideItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Category() {

    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetch(`${API_URL}/Products/types`)
            .then((res) => res.json())
            .then((data) => {
                setCategory(data);
            })
    }, [])

    return (
        <>
            <Navbar />
            <section className='py-10'>
                <div className='container'>
                    <div className="flex items-center justify-between py-3">
                        <h3 className='text-3xl font-semibold text-neutral-900 mb-6'>Explore Our Categories</h3>
                    </div>
                    <div className='flex gap-5 max-sm:justify-center'>
                        <div className="category_page_item flex flex-wrap w-full gap-5 p-5 rounded">
                            {
                                category.map(item => {
                                    return (
                                        <Link to={`/category/${item.id}?name=${item.name}`} key={item.id}
                                            className={`image-item p-2 text-2xl hover:bg-gray-100 hover:text-main-color transition duration-300 hover:shadow cursor-pointer flex gap-3 items-center flex-col justify-center rounded-lg`}>
                                            <img src={item.pictureUrl} alt='image' />
                                            <span className='text-center'>{item.name}</span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Category