import React from 'react'
import img1 from "../assets/images/help/faq.png"
import img2 from "../assets/images/help/online_payment.png"
import img3 from "../assets/images/help/home_delivery.png"
const HelpServices = () => {
    const helpData = [
        { id: 1, img: img1, title: "Frequently asked questions", desc: "Updates on safe Shopping in our Stores" },
        { id: 2, img: img2, title: "Online Payment Process", desc: "Updates on safe Shopping in our Stores" },
        { id: 3, img: img3, title: "Home Delivery Options", desc: "Updates on safe Shopping in our Stores" },
    ]
    return (
        <section className='py-20'>
            <div className='container'>
                <h3 className='text-3xl font-semibold text-neutral-900 mb-10'>Services to help you shop</h3>
                <div className='flex gap-6 flex-wrap'>
                    {
                        helpData.map((item) => {
                            return (
                                <div className='help_item bg-zinc-50 rounded' key={item.id}>
                                    <div className='text p-10'>
                                        <h3 className='font-bold text-2xl mb-6 w-64 leading-8'>{item.title}</h3>
                                        <p className='text-base'>{item.desc}</p>
                                    </div>
                                    <div className='image overflow-hidden rounded-b-lg'>
                                        <img src={item.img} alt={`img-${item.id}`} className='rounded-b-lg w-full hover:scale-110 transition duration-300' />
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default HelpServices