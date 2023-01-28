import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchDeleteCart } from "../Features/cart";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { fetchProductById, fetchUpdateQuantity } from "../Features/product";
import { fetchToko, fetchUserById } from "../Features/users";
import { useState } from "react";

const CardCart = (props) => {
  const dispatch = useDispatch();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "Idr",
    }).format(number);
  };
  const hrg = parseInt(props.prodak.price);
  const tq = parseInt(props.quantity);
  const totalHarga = hrg * tq;
  const deleteCart = (e) => {
    e.preventDefault();
    var idkeranjang = props.id;
    dispatch(fetchProductById(props.prodak.id)).then((res) => {
      const id = res.payload.data.id;
      const qtProduct = parseInt(res.payload.data.quantity);
      const qtt = { quantity: qtProduct + props.quantity };
      dispatch(fetchUpdateQuantity({ id, qtt })).then((res) => {
        dispatch(fetchDeleteCart(idkeranjang)).then((response) => {
          Swal.fire({
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: "success",
            title: "Delete Successfully",
          });
        });
      });
    });
  };

  const url = "http:\\\\localhost:8000\\";
  return (
    <>
      <div className="cartCard">
        <div className="cartProductMenu">
          <div className="productInfo">
            <div className="productImage">
              <img src={url + props.prodak.gambar} alt="" />
            </div>
            <div className="productName">
              <h2>{props.prodak.products}</h2>
            </div>
          </div>
          <div className="productMenuList">
            <div className="PML1">
              <div className="menuList">
                <p className="price">{rupiah(props.prodak.price)}</p>
              </div>
              <div className="menuList">
                <p>{props.quantity}</p>
              </div>
            </div>
            <span className="linePML"></span>
            <div className="PML2">
              <div className="menuList">
                <p className="totalPrice">{rupiah(totalHarga)}</p>
              </div>
              <div className="menuList">
                <button onClick={deleteCart} className="del">
                  <i className="fa-solid fa-trash"></i>
                  <span> Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardCart;
