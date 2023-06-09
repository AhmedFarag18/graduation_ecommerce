import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SideNav from '../SideNav';
import axios from 'axios';
import { API_URL } from '../../../App';
import { useSelector } from 'react-redux';

const DeleteBrand = () => {
    const authUser = useSelector(x => x.auth.user);

    const { brandId } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/DashboardBrand/${brandId}`, {
            headers: {
                Authorization: `Bearer ${authUser.token}`
            }
        })
            .then((res) => res.json())
            .then((brand) => {
                setBrand(brand);
            })
    }, [brandId])


    const uploadData = async (e) => {
        e.preventDefault();

        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to Delete this! If you click Ok you will be delete all related products",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your brand has been deleted.',
                        'success'
                    )
                    const res = await axios.post(`${API_URL}/DashboardBrand/deletebrand/${brandId}`, brand, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${authUser.token}`
                        }
                    })
                    navigate("/dashboard/allbrands")
                }
            })

        } catch (err) {
            console.log(err);
        }
    }
    const [open, setOpen] = useState(true);



    return (
        <div className='flex'>
            <SideNav open={open} setOpen={setOpen} />
            <div className='p-5 details_side'>
                <div className="focus:outline-none container relative p-4 bg-white rounded-lg shadow  sm:p-5">
                    <form onSubmit={uploadData}>
                        <h3 className="focus:outline-none text-2xl font-semibold text-gray-900 ">
                            Delete Brand
                        </h3>

                        <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 ">Brand Name</label>
                                <div value={brand.name} className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg select-none block w-full p-2.5 " >{brand.name}</div>
                            </div>
                            <div className='flex justify-between gap-5 col-span-2 border w-fit'>
                                <img src={brand.pictureUrl} alt={brand.name} className='w-28 h-28' />
                            </div>
                            <div className="focus:outline-none flex items-center space-x-4">
                                <button type="submit" className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Delete Brand
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteBrand