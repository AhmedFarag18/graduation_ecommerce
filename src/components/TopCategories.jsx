import "swiper/css";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

function TopCategories() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/Products/types`)
            .then(response => response.json())
            .then(types => {
                setCategory(types)
            });
    }, [])

    return (
        <section className='category py-10'>
            <div className='container'>
                <div className="flex items-center justify-between py-3">
                    <h3 className='text-3xl font-semibold text-neutral-900 '>Top Categories</h3>
                    <Link to="/category" className="hover:text-main-color transition duration-300">All Categories <BsBoxArrowUpRight className="inline-block mx-1" /> </Link>
                </div>
                <div className="category_items flex">
                    {
                        category ? category.slice(0, 8).map((item) => {
                            return (
                                <Link to={`/category/${item.id}?name=${item.name}`} className="category_item" key={item.id}>
                                    <div className="flex flex-col py-5 justify-center items-center rounded big_shadow transition duration-300 cursor-pointer" key={item.id}>
                                        <img src={item.pictureUrl} alt={item.name} className="h-auto w-3/4" />
                                        <h5 className="category_item-name">{item.name}</h5>
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

export default TopCategories