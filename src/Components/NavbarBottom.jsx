import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

const NavbarBottom = () => {
  const cookies = new Cookies();
  const users = useSelector((state) => state.users.users.data);
  const token = cookies.get("token");
  var dtimg = users?.image;
  var ssdd = dtimg?.replace("\\", "/");

  return (
    <>
      {token ? (
        <div className="hContentBottom">
          <div className="hcContent">
            <Link to="/" className="hcb hcbHome">
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/wishlist" className="hcb hcbWishlist">
              <i className="fa-solid fa-heart"></i>
              <p>Wishlist</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/cart" className="hcb hcbCart">
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Cart</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/profile" className="hcb hcbProfile">
              <img
                src={
                  "http://https://narko-be-production.up.railway.app//" + ssdd
                }
              />
            </Link>
          </div>
        </div>
      ) : (
        <div className="hContentBottom">
          <div className="hcContent">
            <Link to="/" className="hcb hcbHome">
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/wishlist" className="hcb hcbWishlist">
              <i className="fa-solid fa-heart"></i>
              <p>Wishlist</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/cart" className="hcb hcbCart">
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Cart</p>
            </Link>
            <div className="hcLine"></div>
            <Link to="/login" className="hcb hcbProfile">
              <i className="fa-solid fa-user"></i>
              <p>Login</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarBottom;
