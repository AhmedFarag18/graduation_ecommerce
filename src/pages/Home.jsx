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
import jwt_decode from 'jwt-decode';

const Home = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || null)

    if (userData != null) {
        const token = userData.token;
        const decodedToken = jwt_decode(token, { complete: true });
        const websiteRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        localStorage.setItem("role", JSON.stringify(websiteRole));
    }

    return (
        <>
            <Navbar />
            <Slider />
            <Features />
            <BestDeals title="Latest Users Products" query="SellerProducts" />
            <BestBrands />
            <BestDeals title="Best Products" query="Products?sort=priceAsc&search=om" />
            <TopCategories />
            <Discount />
            <BestDeals title="Latest of Barcelona" query="novaProducts?search=barcelona" />
            <HomeCardPayment />
            <BestDeals title="cheapest Man city products" query="novaProducts?sort=priceAsc&search=city" />
            <HelpServices />
            <Footer />
        </>
    );
};

export default Home;