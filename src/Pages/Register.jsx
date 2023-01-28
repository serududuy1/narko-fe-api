import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../Assets/img/Logo.svg";
import { fetchCreateUser } from "../Features/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPw = () => {
    const pw = document.querySelector("#pwd");
    if (pw.type === "password") {
      pw.type = "text";
    } else {
      pw.type = "password";
    }
  };

  const klikRegister = (e) => {
    e.preventDefault();
    // console.log("klik berhasil");
    // console.log(password);
    // console.log(username);

    const datas = {
      username: username,
      password: password,
      email: email,
    };
    dispatch(fetchCreateUser(datas)).then((res) => {
      // console.log(res.payload.name);
      if (res.payload.name === "AxiosError") {
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
          title: "Email already in use",
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
          icon: "success",
          title: "Register Successfully",
        }).then(navigate("/login"));
      }
    });
  };

  return (
    <div className="reg-container">
      <NavLink to="/" className="logter">
        <img src={Logo} alt="Register Logo" />
      </NavLink>
      <div className="reg-section">
        <div className="reg-title">
          <h1>Create Account</h1>
        </div>
        <form onSubmit={klikRegister}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            id="pwd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="shwPW">
            <input className="ckbx" type="checkbox" onClick={showPw} />
            <p>Show Password</p>
          </label>
          <button type="submit" className="btn-reg">
            <i className="fa-solid fa-right-to-bracket"></i>
            <span> Register</span>
          </button>
          <div className="reg-footer">
            <h5>
              By continuing, you agree to Narko's Conditions of Use and Privacy
              Notice.
            </h5>
          </div>
        </form>
        <span className="line"></span>
        <span className="lk-login">
          Already have an account ?{" "}
          <Link className="to-login" to="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
