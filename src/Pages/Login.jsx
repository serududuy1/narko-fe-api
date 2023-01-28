import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin, setError } from "../Features/users";
import Swal from "sweetalert2";
import "../Assets/css/App.css";

import Logo from "../Assets/img/Logo.svg";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.users?.error);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const showPw = () => {
    const pw = document.querySelector("#pwd");
    if (pw.type === "password") {
      pw.type = "text";
    } else {
      pw.type = "password";
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
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
        icon: "error",
        title: "Email or Password cannot be empty",
      });
    } else {
      const data = {
        email,
        password,
      };

      dispatch(fetchLogin(data)).then((res) => {
        // console.log(res);
        if (res.payload.statusLogin === "Berhasil") {
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
            title: "Login Successfully",
          }).then((res) => {
            Navigate("/");
          });
        } else {
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
            icon: "error",
            title: "Email or Password incorrect",
          });
        }
      });
    }
  };

  return (
    <div className="container-login">
      <NavLink to="/" className="loggin">
        <img src={Logo} alt="Login Logo" />
      </NavLink>
      <div className="section">
        <div className="title">
          <h1>Sign in</h1>
        </div>
        <form className="flex-column">
          <label htmlFor="email" className="text-left">
            Email or Phone number
          </label>
          {error}
          <input
            type="text"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            className="email"
          />
          <label className="text-left">Password</label>
          <input
            id="pwd"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="shwPW">
            <input className="ckbx" type="checkbox" onClick={showPw} />
            <p>Show Password</p>
          </label>
          <button className="btn" onClick={handlelogin}>
            <i className="fa-solid fa-right-to-bracket"></i>
            <span> Login</span>
          </button>
          <div className="footer-nav">
            <h5 className="text-left">
              By continuing, you agree to Narko's Conditions of Use and Privacy
              Notice.
            </h5>
          </div>
        </form>
      </div>
      <div className="reg-title-sec">
        <hr />
        <p>New to Narko's ?</p>
        <hr />
      </div>
      <div className="reg-sec">
        <NavLink to="/register" className="reg-btn">
          <span>Create your Narko account</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
