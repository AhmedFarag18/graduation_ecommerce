import React, { useEffect, useState } from 'react';
import Slider from "../components/Slider";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import TopCategories from '../components/TopCategories';
import BestDeals from '../components/BestDeals';
import Features from '../components/Features';
import Discount from '../components/Discount';
import BestBrands from '../components/BestBrands';
import HomeCardPayment from '../components/HomeCardPayment';
import HelpServices from '../components/HelpServices';

const Home = () => {
    let searchText = "phone"

    return (
        <>
            <Navbar />
            <Slider />
            <Features />
            <BestBrands />
            <TopCategories />
            <Discount />
            <BestDeals title="Best Deals" search={searchText} />
            <HomeCardPayment />
            <HelpServices />
            <Footer />
        </>
    );
};

export default Home;