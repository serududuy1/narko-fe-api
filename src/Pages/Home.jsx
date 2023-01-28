import React from "react";
import { useState, Suspense } from "react";
import { Switch, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Loading from '../Components/Loading'

import "../Assets/css/App.css";

const Product = React.lazy(() => import("../Components/Product"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const Profile = React.lazy(() => import("./Profile"));
const Cart = React.lazy(() => import("./Cart"));
const Wishlist = React.lazy(() => import("./Wishlist"));
const Checkout = React.lazy(() => import("./Checkout"));
const DetailProduk = React.lazy(() => import("./DetailProduk"));
const Topup = React.lazy(() => import("./Topup"));
const PostSeller = React.lazy(() => import("./PostSeller"));
const UpdatePost = React.lazy(() => import("./UpdatePost"));
const SellerProfile = React.lazy(() => import("./SellerProfile"));
const SellerInfo = React.lazy(() => import("./SellerInfo"));
const SellerEdit = React.lazy(() => import("./SellerEdit"));
const NotFound = React.lazy(() => import("./NotFound"));

const Home = () => {
  return (
        
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Suspense fallback={<Loading />}><Product /></Suspense>} />
          <Route path="/topup" element={<Suspense fallback={<Loading />}><Topup /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<Loading />}><Register /></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
          <Route path="/postseller" element={<Suspense fallback={<Loading />}><PostSeller /></Suspense>} />
          <Route path="/updatepost" element={<Suspense fallback={<Loading />}><UpdatePost /></Suspense>} />
          <Route path="/seller" element={<Suspense fallback={<Loading />}><SellerProfile /></Suspense>} />
          <Route path="/sellerinfo" element={<Suspense fallback={<Loading />}><SellerInfo /></Suspense>} />
          <Route path="/sellerprofile" element={<Suspense fallback={<Loading />}><SellerProfile  /></Suspense>} />
          <Route path="/selleredit" element={<Suspense fallback={<Loading />}><SellerEdit  /></Suspense>} />
          <Route path="/cart" element={<Suspense fallback={<Loading />}><Cart /></Suspense>} />
          <Route path="/wishlist" element={<Suspense fallback={<Loading />}><Wishlist /></Suspense>} />
          <Route path="/checkout" element={<Suspense fallback={<Loading />}><Checkout /></Suspense>} />
          <Route path="/detailProduk/search" element={<Suspense fallback={<Loading />}><DetailProduk /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
        
  );
};

export default Home;
