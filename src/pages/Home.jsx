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
    return (
        <>
            <Navbar />
            <Slider />
            <Features />
            <BestDeals title="Latest Products" query="?PageIndex=6&PageSize=6" />
            <BestBrands />
            <TopCategories />
            <Discount />
            <BestDeals title="Latest of Barcelona" query="?search=barcelona" />
            <HomeCardPayment />
            <BestDeals title="Best cheap products" query="?sort=priceAsc" />
            <HelpServices />
            <Footer />
        </>
    );
};

export default Home;