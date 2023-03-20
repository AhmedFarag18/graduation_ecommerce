import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Brand from '../components/Brand'
import ScrollToTop from '../components/ScrollToTop'
import AddProduct from '../Dashboard/AddProduct'
import AdminDashboard from '../Dashboard/AdminDashboard'
import Category from '../pages/Category'
import CategoryItem from '../pages/CategoryItem'
import Contact from '../pages/Contact'
import Details from '../pages/Details'
import EmailVerification from '../pages/EmailVerification'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import Products from '../pages/Products'
import SignUp from '../pages/SignUp'

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/category" element={<Category />} />
        <Route path='/category/:categoryItem' element={<CategoryItem />} />

        <Route path="/details/:productID" element={<Details />} />
        <Route path="/brand/:BrandName" element={<Brand />} />

        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyemail" element={<EmailVerification />} />

        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />

        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/dashboard/addproduct' element={<AddProduct />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router