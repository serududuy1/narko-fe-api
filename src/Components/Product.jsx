import { useState, useEffect } from "react";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "./Slider";
import Category from "./Category";
import { fetchAllProducts } from "../Features/product";
import { useSelector, useDispatch } from "react-redux";

const Product = () => {
  const productUser = useSelector((state) => state.product.products.data);
  const searchProduct = localStorage.getItem("search");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <Header />
      <div className="homeContainer">
        {searchProduct ? null : (
          <>
            <Slider />
            <Category />
          </>
        )}
        <div className="proContainer">
          <div className="proTitle">
            <h2>Product Jualan Yang Memang Ingin Dijual!</h2>
          </div>
          <span className="proLine"></span>
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

export default Product;
