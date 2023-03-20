import React from 'react'
import { useParams } from 'react-router-dom';

function Brand() {
    const { BrandName } = useParams();
    // console.log("Brand", BrandName);

    return (
        <div className='flex justify-center items-center h-screen bg-red-200'>
            <h1>Hello Brand {BrandName}</h1>
        </div>
    )
}

export default Brand