import React from 'react'
import { useDispatch } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import { deleteFromCart } from '../redux/slices/cart-slice'

function CartItem({ product, onUpdate }) {
    const dispatch = useDispatch()

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        onUpdate({ ...product, quantity: newQuantity });
    };

    return (
        <div className='p-3 mb-3 flex justify-between items-center w-full'>
            <div className='flex p-2 gap-6 items-center w-6/12'>
                <img src={product.pictureUrl} width="80" alt={`image-${product.productName}`} />
                <div className='flex-col flex gap-2'>
                    <span className='text-base font-semibold'>{product.productName}</span>
                    <span className='text-sm bg-gray-200 p-2 w-fit text-main-color rounded'>{product.type}</span>
                </div>
            </div>
            <div className='flex p-2 w-2/12'>
                <input type='number' value={product.quantity} min={1} onChange={handleQuantityChange} name="qty" className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 p-2.5 w-full' />
            </div>
            <div className='flex p-2 w-2/12'>
                ${product.price}
            </div>
            <div className='flex p-2 w-2/12'>
                <button onClick={() => dispatch(deleteFromCart(product))} type="button" id="deleteProductButton" className="inline-flex gap-1 items-center px-3 py-2  ">
                    <MdDelete className='text-xl text-red-700' />
                </button>
            </div>
        </div>
    )
}

export default CartItem