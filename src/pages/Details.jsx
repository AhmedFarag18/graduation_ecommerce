import React from 'react'
import { useParams } from 'react-router-dom';
import BestDeals from '../components/BestDeals';
import DetailsProduct from '../components/DetailsProduct'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Recommended from '../components/Recommended';

function Details() {
    const { productID } = useParams();
    const searchText = window.location.search.slice(8, 10);

    return (
        <div>
            <Navbar />
            <DetailsProduct productID={productID} />
            {
                searchText ?
                    <div className='mt-14'>
                        <Recommended title="Recommended" search={searchText} />
                    </div> : <div></div>
            }
            <Footer />
        </div>
    )
}

export default Details