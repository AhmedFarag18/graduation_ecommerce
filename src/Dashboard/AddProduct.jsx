import React, { useState } from 'react'
import axios from 'axios';
function AddProduct() {

    const [fileSelected, setFileSelected] = useState();
    const [fileName, setFileName] = useState();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [brand, setBrand] = useState();

    const saveFileSelected = (e) => {
        setFileSelected(e.target.files[0]);
        console.log(fileSelected);
    }

    const uploadData = async (e) => {
        e.preventDefault();
        const finalData = {
            "name": name,
            "description": description,
            "price": price,
            "url": fileSelected,
            "productBrand": brand,
            "productType": type,
        }

        try {
            const res = await axios.post("https://localhost:5001/api/DashboardProducts/addproduct", finalData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <div className="focus:outline-none relative p-4 w-full max-w-5xl m-auto h-full md:h-auto">
                <div className="focus:outline-none relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="focus:outline-none flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="focus:outline-none text-lg font-semibold text-gray-900 dark:text-white">
                            Add new Product
                        </h3>
                    </div>
                    <form onSubmit={uploadData}>
                        <div className="focus:outline-none grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Ex. Apple iMac 27&ldquo;" />
                            </div>
                            <div>
                                <label htmlFor="brand" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                <input onChange={(e) => setBrand(e.target.value)} type="text" name="brand" id="brand" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Ex. Apple" />
                            </div>
                            <div>
                                <label htmlFor="type" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <select onChange={(e) => setType(e.target.value)} id="type" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
                                    <option value="EL">Electronics</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="$299" />
                            </div>
                            <div>
                                <label htmlFor="pictureUrl" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Picture</label>
                                <input onChange={saveFileSelected} type="file" name="pictureUrl" id="pictureUrl" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                            </div>
                            <div className="focus:outline-none sm:col-span-2">
                                <label htmlFor="description" className="focus:outline-none block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} id="description" rows="5" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" placeholder="Write a description..."></textarea>
                            </div>
                        </div>
                        <div className="focus:outline-none flex items-center space-x-4">
                            <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                Add product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct