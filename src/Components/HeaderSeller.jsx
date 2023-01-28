import { Link } from "react-router-dom";
import NSLR from "../Assets/img/LogoSell.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../Features/users";
import { useEffect } from "react";
import NavbarBottom from "./NavbarBottom";

const HeaderSeller = () => {
  const auth = useSelector((state) => state.users.users.data);
  const users = useSelector((state) => state.users.users.data);
  const dispatch = useDispatch();
  var dtimg = users?.image;
  var ssdd = dtimg?.replace("\\", "/");

  useEffect(() => {
    dispatch(fetchUserById());
  }, [auth?.name]);
  return (
    <>
      <div className="hdsContainer">
        <img src={NSLR} alt="Logo Seller" />
        <div>
          <Link className="hdsProfile" to="/profile">
            <img src={"http://localhost:8000/" + ssdd} />
            <p>Toko {auth?.name}</p>
          </Link>
        </div>
      </div>
      <div id="NB" className="menuBar">
        <NavbarBottom />
      </div>
    </>
  );
};

export default HeaderSeller;
