import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import BEGE from "../Assets/img/slider5.png";
import background from "../Assets/img/slider4.png";

import { fetchAllProducts } from "../Features/product";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const SellerProfile = () => {
  const productUser = useSelector((state) => state?.product?.products?.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <Header />
      <div className="sellerProfileContainer">
        <div className="profSeller">
          <div
            className="jumbotron"
            style={{ backgroundImage: `url(${background})` }}
          >
            <img src={BEGE} alt="Profile Seller" />
            <h2>BrockLyn T-Shirt</h2>
            <div className="prfBtn">
              <button className="btnF">
                <i className="fa-solid fa-plus"></i>
                <span> Follow</span>
              </button>
              <button className="btnC">
                <i className="fa-solid fa-comments"></i>
                <span> Chat Now</span>
              </button>
            </div>
            <span className="bg"></span>
          </div>
        </div>
        <div className="prodSeller">
          <h1>Product</h1>
          <div className="card-container">
            {productUser?.map((data, i) => (
              <Card
                key={i}
                images={data.images}
                title={data.nameProducts}
                price={data.price}
                stock={data.quantity}
                id={data.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerProfile;
