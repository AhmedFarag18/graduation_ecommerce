import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { changeDeliveryMethodId } from '../../redux/slices/order-slice';
import { changeShippingPrice } from '../../redux/slices/basket-slice';

function ShippingMethods({ deliveryMethods }) {

    const [methodId, setMethodId] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeDeliveryMethodId(methodId))
        dispatch(changeShippingPrice(shippingPrice))
        console.log(shippingPrice, " dj ", methodId);
    }, [methodId])

    return (
        <div className='p-5'>
            <h4 className='text-xl text-neutral-900 my-5 font-semibold'>Shipping Methods</h4>
            <div>
                <ul className="grid w-full gap-6 md:grid-cols-2 select-none">
                    {
                        deliveryMethods.map((item) => {
                            return (
                                <li key={item.id}>
                                    <input type="radio" id={`${item.shortName}`}
                                        onChange={(e) => {
                                            setMethodId(parseInt(e.target.value))
                                            dispatch(changeDeliveryMethodId(+e.target.value))
                                            setShippingPrice(parseInt(e.target.getAttribute('aria-details')))
                                        }}
                                        aria-details={item.cost} value={item.id} name="hosting" className="hidden peer" />
                                    <label htmlFor={`${item.shortName}`} className="flex items-start  justify-between w-full p-5 text-neutral-700 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-main-color hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold text-black">{item.shortName} <span className='block text-xs font-normal text-neutral-700'>{item.description}</span></div>
                                            <div className="w-full text-gray-500 text-sm mt-5">{item.deliveryTime}</div>
                                            <div className="w-full text-lg font-semibold text-main-color">${item.cost}.00</div>
                                        </div>
                                        <AiOutlineCheckCircle className='text-2xl' />
                                    </label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ShippingMethods