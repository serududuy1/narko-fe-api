import Header from "../Components/Header";
import Footer from "../Components/Footer";
import OWO from "../Assets/img/slider1.png";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "../Features/users";
import { useEffect } from "react";
import CardWishlist from "../Components/CardWishlist";
import Cookies from "universal-cookie";

const Wishlist = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const swalStyleIcon = Swal.mixin({
    customClass: {
      icon: "iconSwal",
      timerProgressBar: "progSwal",
    },
    buttonsStyling: false,
  });
  const wishlist = useSelector((state) => state.users.wishlist.data);
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

  useEffect(() => {
    dispatch(fetchWishList());
  }, []);

  return (
    <>
      <Header />
      <div className="wishlistContainer">
        <div className="wishlistTitle">
          <h1>
            <i className="fa-solid fa-heart"></i>
            <span> WISHLIST</span>
          </h1>
          <span className="lineWL"></span>
        </div>
        <div className="wishlistSection">
          {wishlist?.map((dat, i) => (
            <CardWishlist
              key={i}
              toko={dat.User.name}
              prodak={dat.Product}
              quantity={dat.jumlahBarang}
              id={dat.id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
