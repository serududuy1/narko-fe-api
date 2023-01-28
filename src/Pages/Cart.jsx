import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchAllcarts,
  fetchAllcartsById,
  fetchDeleteCart,
} from "../Features/cart";
import CardCart from "../Components/CardCart";
import { fetchAddtransaction } from "../Features/transaction";
import { fetchAllProducts } from "../Features/product";
import {
  fetchSellerId,
  fetchUpdateSaldo,
  fetchUpdateSaldoPenjual,
} from "../Features/users";
import Cookies from "universal-cookie";
import { useState } from "react";

const Cart = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.users.users.data);
  const cardId = useSelector((state) => state.cart.cartsById.data);
  const hasildelete = useSelector((state) => state.cart.cartsDestroy);
  const [cek, setCek] = useState("");
  const swalStyleIcon = Swal.mixin({
    customClass: {
      icon: "iconSwal",
      timerProgressBar: "progSwal",
    },
    buttonsStyling: false,
  });
  const saldoAwal = parseInt(auth?.saldo);
  var totalHarga = 0;
  const tambah = () => {
    if (cek < 1) {
      return Swal.fire({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "error",
        title: "Keranjang Kosong!",
      });
    }
    cardId.map((a) => {
      const datas = {
        idProduct: a.idProducts,
        idPenjual: a.Product.toko,
        idUser: a.idUser,
        idShipping: "1",
        totalPrice: a.Product.price * a.jumlahBarang,
        quantity: a.jumlahBarang,
        statusTransaksi: "DONE",
      };
      totalHarga += a.Product.price * a.jumlahBarang;
      const saldouser = saldoAwal - totalHarga;
      const idsp = a.Product.toko;
      if (saldouser < 0) {
        return Swal.fire({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: "error",
          title: "Saldo Kurang",
        });
      }
      // console.log("lanjut");
      dispatch(fetchAddtransaction(datas)).then(() => {
        dispatch(fetchUpdateSaldo(saldouser)).then(() => {
          dispatch(fetchSellerId(a.Product.toko)).then((res) => {
            const saldoPenjual =
              parseInt(res.payload.data.saldo) +
              a.Product.price * a.jumlahBarang;
            dispatch(fetchUpdateSaldoPenjual({ idsp, saldoPenjual })).then(
              (res) => {
                const idkeranjang = a.id;
                dispatch(fetchDeleteCart(idkeranjang)).then((response) => {
                  Swal.fire({
                    toast: true,
                    position: "top-right",
                    iconColor: "white",
                    customClass: {
                      popup: "colored-toast",
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    icon: "success",
                    title: "Order Successfully",
                  }).then(() => {
                    navigate("/profile");
                  });
                });
              }
            );
          });
        });
      });
    });
  };

  if (token === null) {
    swalStyleIcon
      .fire({
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        title: "Login Required",
      })
      .then(() => {
        navigate("/login");
      });
  }
  var datauser = auth?.id;

  useEffect(() => {
    dispatch(fetchAllcarts());
    dispatch(fetchAllProducts());
    dispatch(fetchAllcartsById()).then((res) => {
      // console.log(res.payload.data);
      setCek(res.payload.data);
    });
  }, [datauser, hasildelete]);
  return (
    <>
      <Header />
      <div className="cartContainer">
        <div className="cartTitle">
          <h1>
            <i className="fa-solid fa-cart-shopping"></i>
            <span> CART</span>
          </h1>
          <span className="lineCart"></span>
        </div>
        <div className="cartSection">
          {cardId?.map((dat, i) => (
            <CardCart
              key={i}
              toko={dat.User.name}
              prodak={dat.Product}
              quantity={dat.jumlahBarang}
              id={dat.id}
            />
          ))}

          <button onClick={tambah} className="co">
            <i className="fa-solid fa-bag-shopping"></i>
            <span> CHECKOUT</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
