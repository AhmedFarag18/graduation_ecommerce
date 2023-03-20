import React from 'react'
import { Link } from 'react-router-dom'
import CategorySideItem from '../components/CategorySideItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Category() {

    const CategoryItems = [
        { id: 1, name: "Smartphones", color: "bg-red-200" },
        { id: 2, name: "mens-shirts", color: "bg-green-200" },
        { id: 3, name: "Laptops", color: "bg-blue-200" },
        { id: 4, name: "Lighting", color: "bg-indigo-200" },
        { id: 5, name: "Tops", color: "bg-yellow-200" },
        { id: 6, name: "Kitchen", color: "bg-orange-200" },
        { id: 7, name: "Furniture", color: "bg-slate-200" },
    ]

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
                            <CategorySideItem name="Mens-shirts" brands={["Samsung", "Toshipa", "Lenovo"]} />
                            <CategorySideItem name="Clothes" brands={["Z&H", "Fire Wood", "Sutra"]} />
                        </div>
                        <div className="category_page_item grid w-8/12 gap-5 bg-gray-50 p-5 rounded">
                            {
                                CategoryItems.map(item => {
                                    return (
                                        <Link to={`/category/${item.name.toLowerCase()}`} key={item.id} className={`image-item p-2 text-2xl ${item.color} cursor-pointer`}>
                                            {item.name}
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