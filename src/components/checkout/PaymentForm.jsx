import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const PaymentForm = ({ setOpenTab }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);


    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/ordersuccess`,
            },
            customer: user.displayName,
        });
        stripe.Customer.create(
            name = user.displayName,
        )
        if (!error) {
            // history.push("/ordersuccess");
            toast.success("successfully payment");
            redirect('/ordersuccess')
        }
    };

    return (
        <form>
            {/* <AddressElement
                options={{
                    mode: "shipping",
                    defaultValues: {
                        name: 'Jane Doe',
                    }
                }}
                className='my-4'
            /> */}
            <PaymentElement />
            <button type='submit' disabled={!stripe}
                onClick={(e) => {
                    handleSubmit()
                    dispatch(clearCart())
                    localStorage.removeItem('cart_id')
                    e.preventDefault()
                }}
                className='text-base uppercase p-4 my-5 rounded flex gap-2 justify-center items-center leading-normal  bg-main-color text-white'>Pay</button>

            <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                }} data-toggle="tab" href="#link3" role="tablist">
                <FaArrowAltCircleLeft className="text-2xl mr-1" /> Back
            </a>
        </form>
    );
};

export default PaymentForm;