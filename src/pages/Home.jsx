import React, { useEffect, useState } from 'react';
import Slider from "../components/Slider";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import TopCategories from '../components/TopCategories';
import BestDeals from '../components/BestDeals';
import Features from '../components/Features';
import Discount from '../components/Discount';

const Home = () => {
    let searchText = "phone"

    useEffect(() => {
        fetch("https://api.stripe.com/v1/products")
            .then(response => response.json())
            .then(data => console.log(data))
    })

    return (
        <>
            <Navbar />
            <Slider />
            <Features />
            <TopCategories />
            <Discount />
            <BestDeals title="Best Deals" search={searchText} />
            <Footer />
        </>
    );
};

export default Home;

















    // const [userName, setUserName] = useState('');

    // useEffect(() => {
    //     (
    //         async () => {
    //             const response = await fetch("https://localhost:5001/api/Account", {
    //                 headers: { 'Content-Type': 'application/json' },
    //             })
    //             const content = await response.json();
    //             console.log(content)
    //         }
    //     )();
    // }, [])

