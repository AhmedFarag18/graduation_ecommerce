import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function OrdersTable({ orders, setSearchEmail, handleGetOrdersForUser, loader, handleGetAllOrders }) {
    const [show, setShow] = useState(null)

    return (
        <div className="w-full sm:px-6">
            <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <div className="sm:flex items-center justify-between">
                    <p className="text-base my-2 sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">All Orders</p>
                    <div className='flex items-center gap-2'>
                        <div className="relative">
                            <input
                                className="relative text-sm leading-none text-gray-600 bg-white  rounded lg:max-w-[522px] w-full px-4 pr-12 py-3 outline-none"
                                type="email"
                                name="searchbyemail"
                                id="searchbyemail"
                                placeholder="Search By Email"
                                onChange={(e) => { setSearchEmail(e.target.value) }}
                            />
                            <button type='submit' onClick={handleGetOrdersForUser} className="absolute z-20 w-7 h-7 flex justify-center items-center rounded cursor-pointer top-[9px] right-2 bg-main-color text-white">
                                <RiSearchLine />
                            </button>
                        </div>
                        <button type='submit' onClick={handleGetAllOrders} className="text-base p-2 flex justify-center items-center rounded cursor-pointer bg-main-color text-white">
                            All
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                {
                    loader ?
                        <Loader />
                        :
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                    <th className="font-normal text-left pl-4">Buyer Email</th>
                                    <th className="font-normal text-left pl-4">Status</th>
                                    <th className="font-normal text-left pl-12">Information</th>
                                    <th className="font-normal text-left pl-20">Total</th>
                                    <th className="font-normal text-left pl-20">Date</th>
                                    <th className="font-normal text-left pl-16">Items</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {
                                    orders && orders.map(order => {
                                        return (
                                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100" key={order.id}>
                                                <td className="pl-4 cursor-pointer">
                                                    <div className="flex items-center">
                                                        <div className="pl-4">
                                                            <Link to={`/profile?user=${order.buyerEmail}`} className="font-medium">#{order.buyerEmail}</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                {
                                                    order.status === "Pending" ? (
                                                        <td className="pl-4">
                                                            <p className="text-sm font-medium leading-none text-gray-800">{order.status}</p>
                                                            <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                                                <div className="w-12 h-3 bg-yellow-300 rounded-full" />
                                                            </div>
                                                        </td>
                                                    )
                                                        :
                                                        <td className="pl-4">
                                                            <p className="text-sm font-medium leading-none text-gray-800">{order.status}</p>
                                                            <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                                                <div className="w-24 h-3 bg-green-300 rounded-full" />
                                                            </div>
                                                        </td>
                                                }

                                                <td className="pl-12">
                                                    <p className="font-medium">{`${order.shipToAddress.firstName} ${order.shipToAddress.lastName}`}</p>
                                                    <p className="text-xs leading-3 text-gray-600 mt-2">{`${order.shipToAddress.country}, ${order.shipToAddress.city}, ${order.shipToAddress.street}`}</p>
                                                </td>
                                                <td className="pl-12">
                                                    <p className="font-medium">Total: {order.total}$</p>
                                                    <p className="text-xs leading-3 text-gray-600 mt-2">sub Total: {order.subTotal}$</p>
                                                </td>
                                                <td className="pl-20">
                                                    <p className="font-medium">{order.orderDate.split("T")[0]}</p>
                                                    <p className="text-xs leading-3 text-gray-600 mt-2">{order.orderDate.split("T")[1].split(".")[0]}</p>
                                                </td>
                                                <td className="pl-20">
                                                    <div className="flex items-center">
                                                        {
                                                            order.items.map((ele, idx) => {
                                                                return (
                                                                    <LazyLoadImage className={`shadow-md w-10 h-10 rounded-full ${ele.length <= 1 ? "" : "-ml-2"}`
                                                                    } src={ele.pictureUrl} key={idx} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-7 2xl:px-0">
                                                    {
                                                        show == order.id ? <button onClick={() => setShow(null)} className="focus:outline-none pl-7">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button> : <button onClick={() => setShow(order.id)} className="focus:outline-none pl-7">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                                <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                    }
                                                    {show == order.id && <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
                                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                            <p>Edit</p>
                                                        </div>
                                                        <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                                                            <p>Delete</p>
                                                        </div>
                                                    </div>}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default OrdersTable