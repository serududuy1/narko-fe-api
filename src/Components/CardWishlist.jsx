import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OWO from "../Assets/img/slider1.png";
import { fetchDeleteWishlist, fetchWishList } from "../Features/users";
const CardWishlist = (props) => {
  const dispatch = useDispatch();

  const deleteItem = (e) => {
    e.preventDefault();
    const idkeranjang = props.id;
    dispatch(fetchDeleteWishlist(idkeranjang)).then((response) => {
      Swal.fire({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "success",
        title: "Delete Successfully",
      }).then((res) => {
        dispatch(fetchWishList());
      });
    });
  };
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const url = "http:\\\\https://narko-be-production.up.railway.app/\\";

  return (
    <div className="wishlistCard">
      <div className="titleWish">
        <h3>TOKO {props.toko}</h3>
        <span className="lineWL"></span>
      </div>
      <div className="wishlistProductMenu">
        <div className="productInfo">
          <div className="productImage">
            <img src={url + props.prodak.gambar} />
          </div>
          <div className="productName">
            <h2>{props.prodak.products}</h2>
          </div>
        </div>
        <div className="productMenuList">
          <div className="PWL1">
            <div className="menuList">
              <p className="price">{rupiah(props.prodak.price)}</p>
            </div>
            <div className="menuList">
              <p>{props.prodak.quantity}</p>
            </div>
          </div>
          <span className="wishLine"></span>
          <div className="PWL2">
            <div className="menuList menuLilist">
              <Link
                to={`/detailProduk/search?id=${props.prodak.id}`}
                className="toCart"
              >
                <i className="fa-solid fa-layer-group"></i>
                <span> Detail Product</span>
              </Link>
              <span className="mlLine"></span>
              <button className="del" onClick={deleteItem}>
                <i className="fa-solid fa-trash"></i>
                <span> Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardWishlist;
