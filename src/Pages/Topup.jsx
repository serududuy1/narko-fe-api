import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Assets/css/App.css";
import Swal from "sweetalert2";
import Logo from "../Assets/img/LogoPay.svg";
import {
  fetchUpdateSaldo,
  fetchUserById,
  fetchAllUser,
} from "../Features/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Topup = () => {
  const [saldo, setSaldo] = useState("");
  const user = useSelector((state) => state.users.users.data);
  const dispatch = useDispatch();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const topup = (e) => {
    e.preventDefault();
    const saldoakhir = parseInt(user.saldo) + parseInt(saldo);
    dispatch(fetchUpdateSaldo(saldoakhir)).then(
      (res) => dispatch(fetchUserById()),
      Swal.fire({
        text: `Amount ${rupiah(saldo)}`,
        toast: true,
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        icon: 'success',
        title: 'Delete Successfully'
      })
    );
  };

  return (
    <>
      <div className="menuTitle">
        <h1>TOP UP</h1>
      </div>
      <div className="menuSec">
        <form action="" onSubmit={topup}>
          <div className="logo">
            <img src={Logo} alt="Narkopay" />
          </div>
          <label>Amount</label>
          <input type="number" onChange={(e) => setSaldo(e.target.value)} />
          <button type="submit">TOP UP</button>
        </form>
      </div>
    </>
  );
};

export default Topup;
