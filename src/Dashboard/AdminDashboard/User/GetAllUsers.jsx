import React, { useEffect, useState } from 'react'
import SideNav from '../SideNav'
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { API_URL } from '../../../App';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [found, setFound] = useState(true);
    const authUser = useSelector(state => state.auth.user);

    useEffect(() => {
        fetch(`${API_URL}/DashboardUser`, {
            headers: {
                'Authorization': `Bearer ${authUser.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setFound(true);
                } else {
                    setFound(false);
                    setUsers(data);
                }
            })
    }, [users])


    const handleDeleteUser = (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You need to delete user!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'User Account has been deleted.',
                    'success'
                )
                const res = await fetch(`${API_URL}/DashboardUser/${email}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${authUser.token}`
                    }
                })
                navigate("/dashboard/users")
            }
        })

    }
    const [open, setOpen] = useState(true);

    return (
        <div className='flex'>
            <div className={` ${open ? "w-1/5" : "w-20 "} bg-main-color h-screen p-5  pt-8 relative duration-300`}>
                <SideNav open={open} setOpen={setOpen} />
            </div>
            <div className='products_data p-7  w-4/5'>
                <div className='container'>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl ">All Users</h1>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden shadow">
                                    <table className="min-w-full divide-y divide-gray-200 table-fixed ">
                                        <thead className="bg-gray-100 ">
                                            <tr>
                                                <th scope="col" hidden className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    id
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    display name
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    full name
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    email
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    phoneNumber
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    address
                                                </th>
                                                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                found ?
                                                    <tr>
                                                        <td colSpan="8" className='notfound p-3 text-xl md:text-3xl w-full'>Not Matched any Data</td>
                                                    </tr>
                                                    :
                                                    users.map((item, idx) => {
                                                        return (
                                                            <tr className="hover:bg-gray-100 " key={idx}>
                                                                <td hidden className="p-4 text-base font-medium text-gray-900 whitespace-nowrap ">{item.userId}</td>
                                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                                    <div className="text-base font-semibold text-gray-900 ">{item.displayName}</div>
                                                                </td>
                                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap ">
                                                                    <div className="text-base font-semibold text-gray-900 ">{`${item.address.firstName}  ${item.address.lastName}`}</div>
                                                                </td>
                                                                <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">{item.email}</td>
                                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap ">{item.phoneNumber}</td>
                                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap ">{`${item.address.country},  ${item.address.city},  ${item.address.street}`}</td>
                                                                <td className="p-4 space-x-2 whitespace-nowrap">
                                                                    <Link id="updateProductButton" className="inline-flex gap-1 items-center px-3 py-2 text-white rounded-lg bg-indigo-700 hover:bg-indigo-800">
                                                                        <BiEdit className='text-xl' />
                                                                        <span className='text-sm font-medium text-center'>Update</span>
                                                                    </Link>
                                                                    <Link onClick={() => handleDeleteUser(item.email)} id="deleteProductButton" className="inline-flex gap-1 items-center px-3 py-2  text-white bg-red-700 rounded-lg hover:bg-red-800">
                                                                        <MdDelete className='text-xl' />
                                                                        <span className='text-sm font-medium text-center'>Delete item</span>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetAllUsers