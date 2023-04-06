import React from "react";
import { Routes, Route } from "react-router-dom";

// import protect
import ProtectRoute from "./ProtectRoute";

// layout
import AdminLayout from "../Components/Layout/AdminLayout";
import AuthLayout from "../Components/Layout/AuthLayout";
import CustomerLayout from "../Components/Layout/CustomerLayout";

// pages
import Customer from "../Pages/Admin/Customer/Customer";
import Login from "../Pages/Login/Login";
import Overview from "../Pages/Admin/Overview/Overview";
import Product from "../Pages/Admin/Product/Product";
import RegisterAdmin from "../Pages/Admin/RegisterAdmin/RegisterAdmin";
import AddProduct from "../Pages/Admin/AddProduct/AddProduct";
import UpdateProduct from "../Pages/Admin/UpdateProduct/UpdateProduct";
import HomePage from "../Pages/HomePage/HomePage";
import ProductDetails from "../Pages/ProductDetails";
import Register from "../Pages/Register";
import Transaction from "../Pages/Transaction";
import SuccessPayment from "../Pages/SuccessPayment";

export default function Router() {
  return (
    <Routes>
      <Route element={<ProtectRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Overview />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
        </Route>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/transaction/:id" element={<Transaction />} />
          <Route path="/product/transaction/:id/success" element={<SuccessPayment />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
