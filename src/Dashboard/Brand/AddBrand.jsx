import React, { useState } from 'react'
import axios from 'axios';
import SideNav from '../SideNav';
import Swal from 'sweetalert2';

function AddBrand() {


    const [BrandName, setBrandName] = useState("");
    const [brandImage, setBrandImage] = useState(null);

    const handleFileChange = (event) => {
        setBrandImage(event.target.files[0]);
    };


    const uploadData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('url', brandImage);

        const finalData = {
            "name": BrandName,
            "url": brandImage,
        }

        try {
            await axios.post("https://localhost:5001/api/BrandProduct/addbrand",
                finalData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Brand added successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                // clear all data from the input fields
                setName("");
                setFileName(null);
            })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='flex'>
            <SideNav />
            <div className='p-5 w-4/5'>
                <div className="focus:outline-none relative p-4 bg-white rounded-lg shadow  sm:p-5">
                    <form onSubmit={uploadData}>
                        <h3 className="focus:outline-none text-2xl font-semibold text-gray-900 ">
                            Add new Brand
                        </h3>
                        <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 ">Brand Name</label>
                                <input onChange={(e) => { setBrandName(e.target.value) }} type="text" name="name" id="name" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="Apple" />
                            </div>
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="image" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 ">Brand Image</label>
                                <input onChange={handleFileChange} type="file" name="image" id="image" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
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