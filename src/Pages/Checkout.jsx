import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import users, {
  fetchUpdateSaldo,
  fetchUpdateSaldoPenjual,
} from "../Features/users";
import {
  fetchAddtransaction,
  fetchStatusTransaction,
} from "../Features/transaction";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  // const [quantity] = useState("");
  // const [lokasi] = useState("");
  const prodak = useSelector((State) => State.product.productsDetail.data);
  const user = useSelector((state) => state.users.users.data);
  // const isSeller = useSelector((state) => state.product?.penjual);
  // const detailProduk = useSelector(
  //   (state) => state.product.productsDetail.data
  // );
  // const totalHarga = parseInt(quantity) * parseInt(detailProduk?.price);
  const stateCo = useSelector(
    (state) => state.transaction.transactionDetail.data
  );
  // console.log(stateCo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const saldo = parseInt(user?.saldo);
  const btnOrder = () => {
    if (saldo < totalHarga) {
      // console.log("kocak");
      Swal.fire({
        toast: true,
        position: "top-right",
        iconColor: "red",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: "error",
        title: "Saldo Kurang!",
      });
    } else {
      const idsp = stateCo.idPenjual;
      const saldoPenjual = saldo + totalHarga;
      const saldouser = parseInt(user.saldo) - parseInt(totalHarga);
      const idtransaksis = stateCo.id;
      // console.log(idtransaksis);
      dispatch(fetchUpdateSaldo(saldouser)).then(() => {
        dispatch(fetchStatusTransaction({ idtransaksis })).then(() => {
          dispatch(fetchUpdateSaldoPenjual({ idsp, saldoPenjual })).then(
            (res) => {
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
            }
          );
        });
      });
    }
    // console.log(stateCo);
    //   dispatch(fetchAddtransaction(data)).then((res) => {
    //     Swal.fire({
    //       toast: true,
    //       position: 'top-right',
    //       iconColor: 'white',
    //       customClass: {
    //         popup: 'colored-toast'
    //       },
    //       showConfirmButton: false,
    //       timer: 1500,
    //       timerProgressBar: true,
    //       icon: 'success',
    //       title: 'Order Successfully'
    //     })
    //   })
  };
  var totalHarga = 0;
  const url = "http:\\\\narko-be-production.up.railway.app\\";
  return (
    <>
      {" "}
      <Header />
      <div className="coContainer">
        <div className="coTitle">
          <h1>
            <i className="fa-solid fa-bag-shopping"></i>
            <span> CHECKOUT</span>
          </h1>
          <span className="lineCheck"></span>
        </div>
        <div className="coSection">
          <div className="coAddress">
            <div className="addTitle">
              <h2>
                <i className="fa-solid fa-map-location"></i>
                <span> Alamat Penerima</span>
              </h2>
            </div>
            <div className="addInfo">
              <div className="ussrName">
                <h3>{user?.username}</h3>
                <h3>{user?.phone}</h3>
              </div>
              <span className="lineAdd"></span>
              <div className="ussrAdd">
                <p>{user?.address}</p>
              </div>
            </div>
          </div>
          <div className="coProduct">
            <div className="prodTitle">
              <h2>List Product</h2>
              <div className="ptList">
                <p>Unit Price</p>
                <p>Qty</p>
                <h3>Product Subtotals</h3>
              </div>
            </div>
            <div className="prodStore">
              <h3>{prodak?.idPenjual.name}</h3>
            </div>
            <div className="prodProduct">
              <div className="imgInfo">
                <img src={url + prodak?.images} alt="Product" />
                <p>{prodak?.nameProducts}</p>
              </div>
              <div className="priceInfo">
                <p>{rupiah(prodak?.price)}</p>
                <p>{stateCo?.quantity}</p>
                <h3>{rupiah(prodak?.price * stateCo?.quantity)}</h3>
              </div>
            </div>
            <div className="prodTotal">
              <p>Order Totals :</p>
              <h2>
                {
                  ((totalHarga = prodak?.price * stateCo?.quantity),
                  rupiah(prodak?.price * stateCo?.quantity))
                }
              </h2>
            </div>
          </div>
          <div className="coPayment">
            <div className="payTitle">
              <h2>Payment Method</h2>
            </div>
            <span className="linePayment"></span>
            <div className="payInfo">
              <div className="paySTR">
                <p>Product Subtotals</p>
                <p>Postage Total</p>
                <p>Services Fee</p>
                <p>Handling Fee</p>
                <p className="TTL">Total Payment</p>
                <p className="TTL">Jumlah Saldo</p>
              </div>
              <div className="payINT">
                <p>{rupiah(totalHarga)}</p>
                <p>{rupiah(5000)}</p>
                <p>{rupiah(5000)}</p>
                <p>{rupiah(5000)}</p>
                <h3>
                  {((totalHarga = totalHarga + 15000), rupiah(totalHarga))}
                </h3>
                <h3>{rupiah(user?.saldo)}</h3>
              </div>
            </div>
            <span className="line2Payment"></span>
            <div className="payButton">
              <button onClick={btnOrder}>MAKE AN ORDER</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
