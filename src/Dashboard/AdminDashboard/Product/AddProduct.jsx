import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import SideNav from '../SideNav';
import Swal from 'sweetalert2';
import { API_URL } from '../../../App';
import upload from "../../../assets/images/upload.png";
import * as Yup from 'yup';
import { Formik } from 'formik/dist';
import { useSelector } from 'react-redux';

function AddProduct() {
    const authUser = useSelector(x => x.auth.user);
    const [open, setOpen] = useState(true);

    const [file, setFile] = useState(null);
    const [available, setAvailable] = useState(false);
    const [multipleImages, setMultipleImages] = useState();

    const [imageSrc, setImageSrc] = useState(null);
    const [imagesSrc, setImagesSrc] = useState(null);

    // start initializing validation
    const InitialValues = { name: "", brand: "", type: "", price: "", description: "" };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        brand: Yup.string().required("brand is Required."),
        type: Yup.string().required("type is Required."),
        price: Yup.string().required("price is Required."),
        description: Yup.string().required("description is Required."),
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

    const handleMultipleImages = (e) => {
        setMultipleImages(e.target.files);

        if (e.target.files.length) {
            const files = e.target.files;
            const newImages = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    newImages.push(e.target.result);
                    if (newImages.length === files.length) {
                        setImagesSrc(newImages);
                    }
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImagesSrc(null);
        }
    }

    // get all brands  and types
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/Products/brands`)
            .then(response => response.json())
            .then(brands => {
                setBrands(brands)
            });

        fetch(`${API_URL}/Products/types`)
            .then(response => response.json())
            .then(types => {
                setTypes(types)
            });
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        console.log(values.brand);
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", values.price)
        formData.append("url", file)
        formData.append("ProductBrandId", values.brand)
        formData.append("ProductTypeId", values.type)
        formData.append("available", available)
        formData.append("rating", 0)

        for (let i = 0; i < multipleImages.length; i++) {
            formData.append('ImagesUrl', multipleImages[i], multipleImages[i].name);
        }
        console.log(formData);
        try {
            const res = await axios.post(`${API_URL}/DashboardProduct/addproduct`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authUser.token}`
                }
            }).then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            setSubmitting(false);

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='flex'>
            <SideNav open={open} setOpen={setOpen} />
            <div className=" details_side focus:outline-none relative p-4 max-w-5xl m-auto h-full md:h-auto">
                <div className="focus:outline-none relative p-4 bg-white rounded-lg shadow  sm:p-5">
                    <div className="focus:outline-none flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className="focus:outline-none text-2xl font-semibold text-gray-900 ">
                            Add new Product
                        </h3>
                    </div>
                    <Formik
                        initialValues={InitialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {props => {
                            const {
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input value={values.name} onBlur={handleBlur} onChange={handleChange} type="text" name="name" id="name" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="Ex. Apple iMac 27&ldquo;" />
                                            {errors.name && touched.name && (
                                                <div className="text-red-600 text-sm pl-2">{errors.name}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="brand" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">brand</label>
                                            <select value={values.brand} onBlur={handleBlur} onChange={handleChange} id="brand" name='brand' className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-color focus:border-main-color block w-full p-2.5 ">
                                                {
                                                    brands.map(brand => {
                                                        return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                    })
                                                }
                                            </select>

                                            {errors.brand && touched.brand && (
                                                <div className="text-red-600 text-sm pl-2">{errors.brand}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="type" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Type</label>
                                            <select value={values.type} onBlur={handleBlur} onChange={handleChange}
                                                id="type" name='type' className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-color focus:border-main-color block w-full p-2.5 ">
                                                {
                                                    types.map(type => {
                                                        return <option key={type.id} value={type.id}>{type.name}</option>
                                                    })
                                                }
                                            </select>
                                            {errors.type && touched.type && (
                                                <div className="text-red-600 text-sm pl-2">{errors.type}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Price</label>
                                            <input value={values.price} onBlur={handleBlur} onChange={handleChange} type="number" name="price" id="price" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="$299" />
                                            {errors.price && touched.price && (
                                                <div className="text-red-600 text-sm pl-2">{errors.price}</div>
                                            )}
                                        </div>
                                        <div className="flex justify-between gap-5 col-span-2 w-full">
                                            <div className='grow'>
                                                <label htmlFor="pictureUrl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Chosse Picture</label>
                                                <input onBlur={handleBlur} onChange={handleFileChange} type="file" name="pictureUrl" id="pictureUrl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                                            </div>
                                            <img src={imageSrc ? imageSrc : upload} className='w-28' alt='upload image' />
                                        </div>

                                        <div className='flex justify-between col-span-2 gap-5 w-full'>
                                            <div className='grow'>
                                                <label htmlFor="imagesUrl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Choose other images</label>
                                                <input onBlur={handleBlur} onChange={handleMultipleImages} multiple type="file" name="imagesUrl" id="imagesUrl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                                            </div>
                                            <div className='flex gap-2'>
                                                {
                                                    imagesSrc ?
                                                        imagesSrc.map((img, idx) => {
                                                            return <img src={img} className='w-24 h-24 border rounded' key={idx} alt={`image${idx}`} />
                                                        })
                                                        : <img src={upload} className='w-28' alt='uploaded' />
                                                }
                                            </div>
                                        </div>

                                        <div className="focus:outline-none sm:col-span-2">
                                            <label htmlFor="description" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Description</label>
                                            <textarea name='description' value={values.description} onBlur={handleBlur} onChange={handleChange} id="description" rows="5" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-color focus:border-main-color " placeholder="Write a description..."></textarea>

                                            {errors.description && touched.description && (
                                                <div className="text-red-600 text-sm pl-2">{errors.description}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="available" className="focus:outline-none mb-2 text-sm font-medium text-gray-900">Availability</label>
                                            <input value={available}
                                                onBlur={handleBlur} onChange={(e) => { (e.target.checked) ? setAvailable(true) : setAvailable(false) }}
                                                type="checkbox" name="available"
                                                id="available" className="m-3" />
                                        </div>
                                    </div>
                                    <div className="focus:outline-none flex items-center space-x-4">
                                        <button type="submit" disabled={isSubmitting} className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                            Add product
                                        </button>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AddProduct