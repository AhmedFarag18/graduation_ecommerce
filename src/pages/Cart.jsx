import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { clearCart, deleteFromCart } from '../redux/slices/cart-slice'

const Cart = () => {

    const dispatch = useDispatch()
    const cartItmes = useSelector(state => state.cart);

    const totalPrice = cartItmes.reduce((acc, product) => {
        acc += product.price * product.quantity;
        return acc;
    }, 0);
    const qty = cartItmes.reduce((acc, product) => {
        acc += product.quantity;
        return acc;
    }, 0);

    return (
        <>
            <Navbar />
            <div className='shopping_cart min-h-screen container'>
                <p className='py-3 px-2'>
                    <Link to="/" className='text-main-color'>Home</Link>  / <span> Cart</span>
                </p>
                <h1 className='text-3xl mb-5 py-6'>Shopping Cart</h1>
                <div className='mb-5'>
                    {
                        cartItmes.length === 0 ?
                            <div className='py-6 bg-gray-50 rounded text-center text-main-color'>
                                <p className='notfound p-3 text-xl md:text-3xl w-full'>Cart Is Empty</p>
                            </div>
                            :
                            <div className='cart-items flex gap-5 w-full max-md:flex-col max-md:gap-5'>
                                <div className='w-9/12 max-md:w-full border rounded-md border-neutral-200'>
                                    <div className="bg-white divide-y divide-neutral-200 flex flex-wrap">
                                        <div className='p-3 mb-3 flex justify-between items-center w-full bg-gray-50 border border-gray-50'>
                                            <div className="p-2 text-xs font-medium text-left text-gray-500 uppercase flex-auto w-6/12">
                                                item
                                            </div>
                                            <div className="p-2 text-xs font-medium text-left text-gray-500 uppercase flex-auto w-2/12">
                                                qty
                                            </div>
                                            <div className="p-2 text-xs font-medium text-left text-gray-500 uppercase flex-auto w-2/12">
                                                subTotal
                                            </div>
                                            <div className="p-2 text-xs font-medium text-left text-gray-500 uppercase flex-auto w-2/12">
                                                action
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white divide-y divide-gray-200 flex flex-wrap">
                                        {
                                            cartItmes.map((product) => {
                                                return (
                                                    <div className='p-3 mb-3 flex justify-between items-center w-full' key={product.id}>
                                                        <div className='flex p-2 gap-6 items-center w-6/12'>
                                                            <img src={product.pictureUrl} width="80" />
                                                            <div className='flex-col flex gap-2'>
                                                                <span className='text-base font-semibold'>{product.productName}</span>
                                                                <span className='text-sm bg-gray-200 p-2 w-fit text-main-color rounded'>{product.type}</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex p-2 w-2/12'>
                                                            <span name="qty" className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 p-2.5' >{product.quantity}</span>
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
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='w-3/12 max-md:w-full'>
                                    <div className='p-6 py-10 flex gap-5 justify-between flex-col bg-gray-50 border border-neutral-200 rounded-md h-fit'>
                                        <h3 className='text-xl border-b border-main-color py-3 font-bold'>Summary</h3>
                                        <div className='border-b border-main-color py-3'>
                                            <div className='flex gap-2 p-2 justify-between'>
                                                <span className='font-semibold'>Items:</span>
                                                <span className='text-main-color'>{cartItmes.length}</span>
                                            </div>
                                            <div className='flex gap-2 p-2 justify-between'>
                                                <span className='font-semibold'>Quantity:</span>
                                                <span className='text-main-color'>{qty}</span>
                                            </div>
                                            <div className='flex gap-2 p-2 justify-between'>
                                                <span className='font-semibold'>Total Price:</span>
                                                <span className='text-main-color'>{totalPrice}$</span>
                                            </div>
                                        </div>
                                        <Link className='text-sm inline-block cursor-pointer bg-main-color text-white rounded-md p-3 text-center hover:bg-indigo-500 transition duration-300'>Checkout</Link>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart