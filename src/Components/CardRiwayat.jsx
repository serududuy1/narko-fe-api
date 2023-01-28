import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import users, {
  fetchUpdateSaldo,
  fetchUpdateSaldoPenjual,
} from "../Features/users";
import {
  fetchAddtransaction,
  fetchAlltransaction,
  fetchStatusTransaction,
} from "../Features/transaction";
import Swal from "sweetalert2";

import his from "../Assets/img/slider1.png";
import "../Assets/css/App.css";
import { Navigate } from "react-router-dom";
import { fetchAllcarts } from "../Features/cart";
const CardRiwayat = (props) => {
  const user = useSelector((state) => state.users.users.data);
  const stateCo = useSelector(
    (state) => state.transaction.statusTransaksi.data
  );
  const saldo = parseInt(user?.saldo);
  const dispatch = useDispatch();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "Idr",
    }).format(number);
  };
  const datastatus = props.data.statusTransaksi;
  const url = "http:\\\\https://narko-be-production.up.railway.app/\\";

  const payBtn = () => {
    if (saldo < totalHarga) {
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
      const idsp = props.data.idPenjual;
      const saldoPenjual = saldo + totalHarga;
      const saldouser = parseInt(user.saldo) - parseInt(totalHarga);
      const idtransaksis = props.data.id;
      dispatch(fetchUpdateSaldo(saldouser)).then(
        dispatch(fetchStatusTransaction({ idtransaksis })).then(
          dispatch(fetchUpdateSaldoPenjual({ idsp, saldoPenjual }))
            .then((res) => {
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
              });
            })
            .then(() => {
              Navigate("riwayat");
            })
        )
      );
    }
  };
  var totalHarga = 0;

  return (
    <>
      <div className="RegSec">
        <div className="histoCard">
          <div className="hisToko">
            <h2>TOKO MAKMUR ANTI SENGGOL</h2>
            {datastatus === "DONE" ? (
              <h4 className="done">{props.data.statusTransaksi}</h4>
            ) : (
              <h4 className="undone">{props.data.statusTransaksi}</h4>
            )}
          </div>
          <span className="hisLine"></span>
          <div className="hisProduct">
            <div className="hisMb">
              <div className="hisImg">
                <img src={url + props.data.Product?.gambar} />
              </div>
              <div className="hisInfo">
                <h4>{props.data.Product?.products}</h4>
                <p>{props.data.Product?.desc}</p>
                <p>x{props.data.quantity}</p>
              </div>
            </div>
            <div className="hisPrice">
              <p>{rupiah(props.data.Product?.price)}</p>
            </div>
          </div>
          <span className="hisLine"></span>
          <div className="hisTotal">
            {datastatus === "DONE" ? null : (
              <button onClick={payBtn} className="pay">
                PAY NOW
              </button>
            )}
            <span>
              <p>Total Pesanan :</p>
              <h2>
                {
                  ((totalHarga =
                    props.data.Product?.price * props.data?.quantity),
                  rupiah(props.data.Product?.price * props.data?.quantity))
                }
              </h2>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRiwayat;
