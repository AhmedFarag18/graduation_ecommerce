import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import OrderSummary from '../components/checkout/OrderSummary'
import CheckoutForm from '../components/checkout/CheckoutForm'


const Checkout = () => {

    const [openTab, setOpenTab] = useState(1);

    return (
        <div>
            <Navbar />
            <div className='flex justify-between gap-5 my-10 p-5 flex-wrap'>
                <div className='lg:w-7/12 w-full cheackout_information'>
                    <h2 className='text-3xl font-semibold mb-4'>
                        Checkout
                    </h2>
                    <CheckoutForm />
                </div>
                <OrderSummary />
            </div>
        </div>
    )
}

export default Checkout