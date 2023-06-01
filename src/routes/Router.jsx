import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Brand from '../components/Brand'
import ScrollToTop from '../components/ScrollToTop'
import AddBrand from '../Dashboard/AdminDashboard/Brand/AddBrand'
import AddProduct from '../Dashboard/AdminDashboard/Product/AddProduct'
import AddType from '../Dashboard/AdminDashboard/Type/AddType'
import GetProducts from '../Dashboard/AdminDashboard/GetProducts'
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
import { PrivateRoute } from '../Auth/PrivateRoute'
import EditProduct from '../Dashboard/AdminDashboard/Product/EditProduct'
import Checkout from '../pages/Checkout'
import BrandItem from '../pages/BrandItem'
import EditBrand from '../Dashboard/AdminDashboard/Brand/EditBrand'
import ShowAllBrands from '../Dashboard/AdminDashboard/Brand/ShowAllBrands'
import EditType from '../Dashboard/AdminDashboard/Type/EditType'
import DeleteType from '../Dashboard/AdminDashboard/Type/DeleteType'
import ShowAllTypes from '../Dashboard/AdminDashboard/Type/ShowAllTypes'
import DeleteProduct from '../Dashboard/AdminDashboard/Product/DeleteProduct'
import DeleteBrand from '../Dashboard/AdminDashboard/Brand/DeleteBrand'
import { Toaster } from 'react-hot-toast'
import GetAllUsers from '../Dashboard/AdminDashboard/User/GetAllUsers'
import ForgetPassword from '../pages/ForgetPassword'
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../Dashboard/Dashboard'
import AddRole from '../Dashboard/AdminDashboard/AddRole'

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Routes>
        {/* user and anyone can access that */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verifyemail" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/category" element={<Category />} />
        <Route path='/category/:categoryId' element={<CategoryItem />} />
        <Route path="/products" element={<Products />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/brand/:brandId" element={<BrandItem />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:productID" element={<Details />} />

        <Route element={<PrivateRoute />}>
          {/* user and admin can access */}
          <Route path="/checkout" element={<Checkout />} />

          {/* admin only */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/getproducts' element={<GetProducts />} />
          <Route path='/dashboard/allbrands' element={<ShowAllBrands />} />
          <Route path='/dashboard/alltypes' element={<ShowAllTypes />} />
          <Route path='/dashboard/addproduct' element={<AddProduct />} />
          <Route path='/dashboard/editproduct/:productId' element={<EditProduct />} />
          <Route path='/dashboard/deleteproduct/:productId' element={<DeleteProduct />} />

          <Route path='/dashboard/addbrand' element={<AddBrand />} />
          <Route path='/dashboard/editbrand/:brandId' element={<EditBrand />} />
          <Route path='/dashboard/deletebrand/:brandId' element={<DeleteBrand />} />

          <Route path='/dashboard/addtype' element={<AddType />} />
          <Route path='/dashboard/edittype/:typeId' element={<EditType />} />
          <Route path='/dashboard/deleteType/:typeId' element={<DeleteType />} />

          <Route path='/dashboard/users' element={<GetAllUsers />} />
          <Route path='/dashboard/addrole' element={<AddRole />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router