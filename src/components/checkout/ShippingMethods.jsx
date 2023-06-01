import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { changeDeliveryMethodId } from '../../redux/slices/order-slice';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

function ShippingMethods({ deliveryMethods, setOpenTab }) {

    const [methodId, setMethodId] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeDeliveryMethodId(methodId))
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
                                    <input type="radio" id={`${item.shortName}`} onChange={(e) => setMethodId(parseInt(e.target.value))} value={item.id} name="hosting" className="hidden peer" required />
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
            <div className='buttons_step flex justify-between items-center my-5'>
                <a className={"text-base uppercase p-4 shadow-lg rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(1);
                    }} data-toggle="tab" href="#link3" role="tablist">
                    <FaArrowAltCircleLeft className="text-2xl mr-1" /> Back
                </a>
                <a className={"text-base uppercase p-4 shadow hover:shadow-lg transition duration-200 rounded flex gap-2 justify-center items-center leading-normal bg-white text-main-color"}
                    onClick={e => {
                        e.preventDefault();
                        setOpenTab(3);
                    }} data-toggle="tab" href="#link3" role="tablist">
                    Next <FaArrowAltCircleRight className="text-2xl mr-1" />
                </a>
            </div>

        </div>
    )
}

export default ShippingMethods