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
                    <div className='flex gap-5'>
                        <div className='w-3/12 p-2 flex flex-col gap-1'>
                            <CategorySideItem name="Smartphones" brands={["Samsung"]} />
                            <CategorySideItem name="Tops" brands={["Samsung", "Hawawi", "Apple"]} />
                            <CategorySideItem name="Laptop's" brands={["Hp", "Dell", "Asus", "Inspiron", "Lenovo"]} />
                            <CategorySideItem name="Mobiles" brands={["Samsung", "Hawawi", "Lenovo"]} />
                            <CategorySideItem name="Clothes" brands={["Z&H", "Fire Wood", "Sutra"]} />
                        </div>
                        <div className="category_page_item flex flex-wrap w-8/12 gap-5 p-5 rounded">
                            {
                                category.map(item => {
                                    return (
                                        <Link to={`/category/${item.id}?name=${item.name}`} key={item.id}
                                            className={`image-item p-2 text-2xl hover:bg-gray-100 hover:text-main-color transition duration-300 hover:shadow cursor-pointer`}>
                                            {/* <span>{item.name}</span> */}
                                            <img src={item.pictureUrl} />
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