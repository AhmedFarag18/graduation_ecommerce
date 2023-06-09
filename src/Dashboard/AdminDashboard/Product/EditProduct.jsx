import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import SideNav from '../SideNav';
import Swal from 'sweetalert2';
import { API_URL } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const authUser = useSelector(x => x.auth.user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedTypeId, setSelectedTypeId] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedBrandId, setSelectedBrandId] = useState(1);
    const [available, setAvailable] = useState(false);
    const [multipleImages, setMultipleImages] = useState([]);

    const [imageSrc, setImageSrc] = useState(null);
    const [imagesSrc, setImagesSrc] = useState(null);
    // get all brands  and types to show in dropdown
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


    // add new data to the final result to sent it
    useEffect(() => {
        fetch(`${API_URL}/Products/${productId}`)
            .then((res) => res.json())
            .then((product) => {
                setName(product.name);
                setImg(product.pictureUrl)
                setDescription(product.description);
                setPrice(product.price);
                setSelectedType(product.productType);
                setSelectedTypeId(product.productTypeId)
                setSelectedBrand(product.productBrand);
                setSelectedBrandId(product.productBrandId)
                setMultipleImages(product.images);
                setAvailable(product.available)
            })
    }, [productId])


    const [file, setFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
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

    const handleImagesChange = (e) => {
        setMultipleFiles(e.target.files);

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
    };

    const uploadData = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("id", productId)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("url", file)
        formData.append("ProductBrandId", selectedBrandId)
        formData.append("ProductTypeId", selectedTypeId)
        formData.append("available", available)

        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('ImagesUrl', multipleFiles[i], multipleFiles[i].name);
        }

        try {
            if (!name || !selectedBrand || !selectedType || !description || !price) {
                alert("please add all data")
            } else {
                const res = await axios.post(`${API_URL}/DashboardProduct/editproduct/${productId}`,
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authUser.token}`
                    }
                }).then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Product updated successfully',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // navigate to all products
                    navigate("/dashboard/getproducts")
                })
            }
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
                            Update Product
                        </h3>
                    </div>
                    <form onSubmit={uploadData}>
                        <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="name" id="name" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="Ex. Apple iMac 27&ldquo;" />
                            </div>
                            <div>
                                <label htmlFor="brand" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">brand</label>
                                <select value={selectedBrandId} onChange={(e) => {
                                    setSelectedBrand(e.target.value)
                                    setSelectedBrandId(e.target.value)
                                }} id="brand" name='brand' className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-color focus:border-main-color block w-full p-2.5 ">
                                    {
                                        brands.map(brand => {
                                            return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="type" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Type</label>
                                <select value={selectedTypeId} onChange={(e) => {
                                    setSelectedTypeId(e.target.value)
                                    setSelectedType(e.target.value)
                                }}
                                    id="type" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-color focus:border-main-color block w-full p-2.5 ">
                                    {
                                        types.map(type => {
                                            return <option key={type.id} value={type.id}>{type.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " placeholder="$299" />
                            </div>
                            <div className='flex justify-between gap-5 w-full'>
                                <div className='grow'>
                                    <label htmlFor="pictureUrl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Choose Picture</label>
                                    <input onChange={handleFileChange} type="file" name="pictureUrl" id="pictureUrl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                                </div>
                                <img src={imageSrc ? imageSrc : img} className='w-28 h-28' alt='image' />
                            </div>
                            <div className='flex justify-between col-span-2 gap-5 w-full'>
                                <div className='grow'>
                                    <label htmlFor="imagesurl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Choose other images</label>
                                    <input onChange={handleImagesChange} multiple type="file" name="imagesurl" id="imagesurl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                                </div>
                                <div className='flex gap-2'>
                                    {
                                        imagesSrc ?
                                            imagesSrc.map((img, idx) => {
                                                return <img src={img} className='w-24 h-24 border rounded' key={idx} alt='image' />
                                            })
                                            : multipleImages.map((img) => {
                                                return <img src={img.name} className='w-24 h-24 border rounded' key={img.id} alt='image' />
                                            })
                                    }
                                </div>
                            </div>
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="description" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" rows="5" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-color focus:border-main-color " placeholder="Write a description..."></textarea>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="available" className="focus:outline-none mb-2 text-sm font-medium text-gray-900">Availability</label>
                            <input checked={available}
                                onChange={(e) => { (e.target.checked) ? setAvailable(true) : setAvailable(false) }}
                                type="checkbox" name="available"
                                id="available" className="m-3" />
                        </div>
                        <div className="focus:outline-none flex items-center space-x-4">
                            <button type="submit" className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct