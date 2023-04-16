import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Brand from '../components/Brand'
import ScrollToTop from '../components/ScrollToTop'
import AddBrand from '../Dashboard/Brand/AddBrand'
import AddProduct from '../Dashboard/Product/AddProduct'
import AddType from '../Dashboard/Type/AddType'
import AddUser from '../Dashboard/User/AddUser'
import AdminDashboard from '../Dashboard/AdminDashboard'
import GetProducts from '../Dashboard/GetProducts'
import Category from '../pages/Category'
import CategoryItem from '../pages/CategoryItem'
import Contact from '../pages/Contact'
import Details from '../pages/Details'
import EmailVerification from '../pages/EmailVerification'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import Products from '../pages/Products'
import SignUp from '../pages/SignUp'
import Cart from '../pages/Cart'
import ForgetPassword from '../components/ForgetPassword'
import { PrivateRoute } from '../Auth/PrivateRoute'
import EditProduct from '../Dashboard/Product/EditProduct'
import CheckoutPage from '../pages/CheckoutPage'
import BrandItem from '../pages/BrandItem'

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* can see Home and cart only if not signed In */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verifyemail" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />


        <Route element={<PrivateRoute />}>
          <Route path="/category" element={<Category />} />
          <Route path='/category/:categoryId' element={<CategoryItem />} />
          <Route path="/products" element={<Products />} />
          <Route path="/details/:productID" element={<Details />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand/:brandId" element={<BrandItem />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/dashboard/getproducts' element={<GetProducts />} />
          <Route path='/dashboard/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/editproduct/:productId' element={<EditProduct />} />
          <Route path='/dashboard/addbrand' element={<AddBrand />} />
          <Route path='/dashboard/addtype' element={<AddType />} />
          <Route path='/dashboard/adduser' element={<AddUser />} />
        </Route>



      </Routes>
    </BrowserRouter>
  )
}

export default Router