import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { FcShipped } from 'react-icons/fc'

function Ordersuccess() {
    return (
        <div>
            <Navbar />
            <div className='text-center py-20'>
                <div className='flex justify-center items-center'>
                    <FcShipped className='text-5xl my-2.5' />
                </div>
                <p className='text-green-600 text-xl md:text-2xl'>
                    Thank You, Your order is confirmed successfully
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default Ordersuccess