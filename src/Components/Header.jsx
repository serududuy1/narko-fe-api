import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { setLogout } from "../Features/users";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Assets/img/Logo.svg";
import Icon from "../Assets/img/Webicon.png";
import { fetchUserById } from "../Features/users";
import { useEffect, useState } from "react";
import { fetchCariProduk } from "../Features/product";
import NavbarBottom from "./NavbarBottom";
import Cookies from "universal-cookie";

const Header = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users.data);
  const [kata, setKata] = useState("");
  var ssdd = users?.image.replace("\\", "/");
  const cek = () => {
    if (token !== undefined) {
      dispatch(fetchUserById()).then((response) => {
        if (response.payload.name == "AxiosError") {
          Swal.fire({
            title: "Sesi anda telah berakhir!",
            text: "Silahkan Login",
            icon: "error",
          }).then((response) => navigate("/login"));
        }
      });
    }
  };
  const carilah = (e) => {
    e.preventDefault();
    dispatch(fetchCariProduk(kata));
  };
  useEffect(() => {
    cek();
  }, [token]);

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("NB").style.bottom = "0";
    } else {
      document.getElementById("NB").style.bottom = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <>
      {token ? (
        <>
          <header>
            <div className="hContainer">
              <Link to="/" className="img-sc">
                <img className="logo" alt="Logo" src={Logo} />
              </Link>
              <form className="hSearch">
                <input
                  type="text"
                  placeholder="Search..."
                  onInput={() => dispatch(fetchCariProduk(kata))}
                  onChange={(e) => setKata(e.target.value)}
                />
                <button className="hsBtn" onClick={carilah}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
              <Link className="icon wishlist" to="/wishlist">
                <i className="wlReg fa-regular fa-heart"></i>
                <i className="wlSol fa-solid fa-heart"></i>
                <p>Wishlist</p>
              </Link>
              <Link className="icon cart" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                <p className="cart">Cart</p>
              </Link>
              <Link className="icon account" to="/profile">
                <img
                  src={"http://narko-be-production.up.railway.app/" + ssdd}
                />
                <p className="btn-login">{users?.username}</p>
              </Link>
            </div>
          </header>
          <div id="NB" className="menuBar">
            <NavbarBottom />
          </div>
        </>
      ) : (
        <>
          <header>
            <div className="hContainer">
              <Link to="/" className="img-sc">
                <img className="logo" alt="Logo" src={Logo} />
              </Link>
              <form className="hSearch HSNoLogin">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setKata(e.target.value)}
                />
                <button className="hsBtn" onClick={carilah}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
              <Link className="icon account" to="/login">
                <i className="fa-solid fa-user"></i>
                <p className="btn-login">Login</p>
              </Link>
            </div>
          </header>
          <div id="NB" className="menuBar">
            <NavbarBottom />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
