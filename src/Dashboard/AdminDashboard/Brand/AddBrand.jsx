import React, { useState } from 'react'
import axios from 'axios';
import SideNav from '../SideNav';
import Swal from 'sweetalert2';
import { API_URL } from '../../../App';
import upload from "../../../assets/images/upload.png";

import { useSelector } from 'react-redux';

function AddBrand() {

    const authUser = useSelector(state => state.auth.user);

    const [brandName, setBrandName] = useState("");
    const [brandImage, setBrandImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = (e) => {
        setBrandImage(e.target.files[0]);
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (x) => {
                setImageSrc(x.target.result);
            }
            reader.readAsDataURL(imageFile);
        } else {
            setImageSrc(null);
        }
    };

    const uploadData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('url', brandImage);

        try {
            await axios.post(`${API_URL}/DashboardBrand/addbrand`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authUser.token}`
                }
            }).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Brand added successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                // clear all data from the input fields
                setBrandName("");
                setBrandImage(null);
                setImageSrc(null);
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
                            Add new Brand
                        </h3>
                        <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 ">Brand Name</label>
                                <input onChange={(e) => { setBrandName(e.target.value) }} type="text" name="name" id="name" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="Apple" />
                            </div>
                            <div className="flex justify-between gap-5 col-span-2 w-full">
                                <div className='grow'>
                                    <label htmlFor="image" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Brand Image</label>
                                    <input onChange={handleFileChange} type="file" name="image" id="image" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                                </div>
                                <img src={imageSrc ? imageSrc : upload} className='w-28' />
                            </div>
                            <div className="focus:outline-none flex items-center space-x-4">
                                <button type="submit" className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Add Brand
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBrand