import React from 'react'
import CartItem from '../CartItem';
import { deleteFromCart, updateItemQty } from '../../redux/slices/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';

function OrderSummary() {
    const orderItems = useSelector(state => state.cart.basketItems);
    const dispatch = useDispatch();

    const onUpdate = (updatedItem) => {
        dispatch(updateItemQty(updatedItem))
    }

    return (
        <div className='lg:w-1/3 w-full h-fit shadow rounded py-5 px-2'>
            <div className='p-3 mb-10'>

                <h3 className='text-3xl flex items-center gap-2 mb-3'>
                    Order summary <span className='bg-main-color rounded-full text-base w-8 h-8 flex justify-center items-center text-white'>{orderItems.length}</span>
                </h3>
                <hr className='border-main-color' />
            </div>
            <div className='order_items'>
                {
                    orderItems.map(product => {
                        return (
                            <div className='p-3 mb-3 flex flex-col justify-between items-center w-full' key={product.id}>
                                <div className="flex gap-2 w-full">
                                    <img src={product.pictureUrl} width="100" alt={product.productName} />
                                    <div className='flex flex-col items-end justify-center w-full gap-5'>
                                        <div className='flex justify-between items-center w-full flex-wrap'>
                                            <span className='inline-block text-base font-semibold'>{product.productName}</span>
                                            <div className='text-main-color font-medium text-xl'>
                                                ${product.price}
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center w-full'>
                                            <div className='w-full items-center flex gap-1'>
                                                <span>QTY: </span>
                                                {/* <span name="qty" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 h-auto w-10 flex justify-center items-center' >{product.quantity}</span> */}
                                                <input value={product.quantity} readOnly name="qty" className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 p-2.5 w-1/4' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OrderSummary