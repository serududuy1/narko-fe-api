import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import { fetchLogout } from "../Features/users";
import { NavLink, useNavigate, Link, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topup from "./Topup";
import SettingAkun from "./AccountSettings.jsx";
import Riwayat from "./Riwayat.jsx";
import SellerInfo from "./SellerInfo";

const Profile = () => {
  const [isAktif, setIsAktif] = useState("riwayat");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users.data);
  var dtimg = users?.image;
  var ssdd = dtimg?.replace("\\", "/");
  const changeTopup = () => {
    setIsAktif("topup");
  };
  const changeAkun = () => {
    setIsAktif("settingAkun");
  };
  const changeRiwayat = () => {
    setIsAktif("riwayat");
  };
  const logout = () => {
    dispatch(fetchLogout()).then((res) => {
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
        title: "Logout Successfully",
      }).then((res) => {
        Navigate("/");
      });
    });
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <Header />
      <div className="container-profile">
        <div className="sidebar">
          <div className="csx">
            <div className="profile-pict">
              <img src={"http://localhost:8000/" + ssdd} alt="Profile" />
              <p>{users?.username}</p>
            </div>
            <div className="saldo-sec">
              <p>{rupiah(users?.saldo)}</p>
            </div>
          </div>
          <div className="menu-sec">
            <ul>
              <li onClick={changeTopup}>
                <i className="fa-solid fa-dollar-sign"></i>
                <span>Top up</span>
              </li>
              <li onClick={changeAkun}>
                <i className="fa-solid fa-sliders"></i>
                <span>Account Settings</span>
              </li>
              <li onClick={changeRiwayat}>
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>Purchase History</span>
              </li>
              <Link className="li" to={`/sellerinfo?id=${users?.id}`}>
                <i className="fa-solid fa-comment-dollar"></i>
                <span>Become a seller</span>
              </Link>
            </ul>
          </div>
          <div className="logout-sec">
            <button onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span> Logout</span>
            </button>
          </div>
        </div>
        <div className="menu">
          {isAktif === "topup" ? (
            <Topup />
          ) : isAktif === "settingAkun" ? (
            <SettingAkun />
          ) : isAktif === "riwayat" ? (
            <Riwayat />
          ) : isAktif === "toko" ? (
            <SellerInfo />
          ) : (
            <SettingAkun />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
