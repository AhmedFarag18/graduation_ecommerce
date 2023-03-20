import React from 'react'
import discount from "../assets/images/discount.png";
function Discount() {
    return (
        <section className="discount md:py-24 p-10">
            <div className="container">
                <div className='dicount-card flex justify-center max-sm:items-start max-md:flex-col max-md:justify-between max-md:gap-5 gap-5 items-center bg-zinc-100 rounded-lg'>
                    <div className="card-text pl-5 max-md:pt-10">
                        <div className="flex-col flex relative pl-8 mb-6">
                            <div className="absolute left-0 top-0 mt-3 w-1 bg-indigo-500 h-full"></div>
                            <div className='select-none'>
                                <h2 className="text-3xl mb-0 text-neutral-700">Save<br />
                                    <span className="xl:text-8xl lg:text-6xl md:text-4xl font-bold tracking-widest">20% OFF</span>
                                    <br />In Fashion
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-auto max-sm:flex-col max-sm:items-start">
                            <div className="text-neutral-800">Use the discount code</div>
                            <div className="bg-indigo-500 text-white p-3 rounded-3xl flex w-auto">FASH2023</div>
                        </div>
                    </div>
                    <div className="card-image w-auto select-none">
                        <div className="image-wrapper w-full md:-mt-20">
                            <img src={discount} className="w-full max-md:max-w-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Discount