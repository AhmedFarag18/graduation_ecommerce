import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Stripe from './Stripe';
import { clientSecret } from '../../redux/slices/basket-slice';

function PaymentMethod({ setOpenTab }) {
    return (
        <>
            <div>
                {
                    clientSecret ? <Stripe clientSecret={clientSecret} setOpenTab={setOpenTab} /> : ""
                }
            </div>
        </>
    )
}

export default PaymentMethod