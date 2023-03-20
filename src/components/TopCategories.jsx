import { category } from "../test";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function TopCategories() {

    return (
        <section className='category py-10'>
            <div className='container'>
                <h3 className='text-3xl font-semibold text-neutral-900 py-3'>Top Categories</h3>
                <div className="category_items flex">
                    {category.map((item) => {
                        return (
                            <div className="category_item" key={item.id}>
                                <div className="flex flex-col py-5 justify-center items-center hover:shadow-md rounded transition cursor-pointer" key={item.id}>
                                    <img src={item.img} alt={item.id} className="h-auto w-3/4" />
                                    {/* <h5 className="category_item-name">{item.name}</h5> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default TopCategories