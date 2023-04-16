import React from 'react'
import cardImg1 from "./../assets/images/card2.png"
import cardImg2 from "./../assets/images/card_red.png"
import cardImg3 from "./../assets/images/card_yellow.svg"
const HomeCardPayment = () => {
    return (
        <section className='bg-zinc-50 py-20 mb-10'>
            <div className='container m-auto'>
                <div className='flex justify-between items-center md:px-20 m-auto max-md:flex-col-reverse md:gap-20 '>
                    <div className='w-full md:w-1/2 max-md:text-center'>
                        <h4 className='text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800'>Get 5% Cash back</h4>
                        <span className='font-bold block my-5'>on novashop.com</span>
                        <button className='p-2 md:px-10 border rounded bg-main-color text-white ease-in duration-300'>Learn More</button>
                    </div>
                    <div className='md:w-1/2 relative w-full '>
                        <img src={cardImg1} className='max-md:mb-10 md:absolute md:bottom-0 md:top-0  -rotate-12 right-0 m-auto z-20' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCardPayment