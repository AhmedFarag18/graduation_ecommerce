import React from 'react'
import { useParams } from 'react-router-dom';
import BestDeals from '../components/BestDeals';
import DetailsProduct from '../components/DetailsProduct'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Details() {
    const { productID } = useParams();

    const searchText = window.location.search.slice(8);

    return (
        <div>
            <Navbar />
            <DetailsProduct productID={productID} />
            <div className='mt-14'>
                <BestDeals title="Recommended" search={searchText} />
            </div>
            <Footer />
        </div>
    )
}

export default Details