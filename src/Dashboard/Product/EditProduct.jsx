import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import SideNav from '../SideNav';
import Swal from 'sweetalert2';
import { API_URL } from '../../App';
import { useParams } from 'react-router-dom';

function EditProduct() {

    const { productId } = useParams();
    console.log(productId);
    // const [selectedProduct, setSelectedProduct] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedTypeId, setSelectedTypeId] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedBrandId, setSelectedBrandId] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/Products/${productId}`)
            .then((res) => res.json())
            .then((product) => {
                console.log(product);
                // setSelectedProduct(product);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setSelectedType(product.productType);
                setSelectedTypeId(product.productTypeId)
                setSelectedBrand(product.productBrand);
                setSelectedBrandId(product.productBrandId)
            })
    }, [productID])



    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };




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


    const uploadData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('url', file);

        const finalData = {
            "name": name,
            "description": description,
            "price": price,
            "url": file,
            "productBrand": selectedBrand,
            "ProductBrandId": selectedBrandId,
            "productType": selectedType,
            "ProductTypeId": selectedTypeId,
        }
        try {
            console.log(selectedBrandId, selectedTypeId, finalData);
            if (!name || !selectedBrand || !selectedType) {
                alert("please add all data")
            }
            const res = await axios.post(`${API_URL}/DProduct/editproduct`,
                finalData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'update product successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='flex'>
            <SideNav />
            <div className=" w-4/5 focus:outline-none relative p-4 max-w-5xl m-auto h-full md:h-auto">
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
                                <select value={selectedBrand} onChange={(e) => {
                                    setSelectedBrandId(e.target.selectedIndex + 1)
                                    setSelectedBrand(e.target.value)
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
                                <select value={selectedType} onChange={(e) => {
                                    setSelectedTypeId(e.target.selectedIndex + 1)
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
                            <div>
                                <label htmlFor="pictureUrl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Choose Picture</label>
                                <input onChange={handleFileChange} type="file" name="pictureUrl" id="pictureUrl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 " />
                            </div>
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="description" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" rows="5" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-color focus:border-main-color " placeholder="Write a description..."></textarea>
                            </div>
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