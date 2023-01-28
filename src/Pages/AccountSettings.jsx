import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Assets/css/App.css";
import { fetchUpdateUser, fetchUserById } from "../Features/users";

const SettingAkun = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");
  const [gambar, setGambar] = useState([]);
  const users = useSelector((state) => state.users.users.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const coba = (e) => {
    e.preventDefault();
    const datas = {
      name,
      password,
      gambar,
      email,
    };
    dispatch(fetchUpdateUser(datas)).then(
      (res) => dispatch(fetchUserById()),
      Swal.fire({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        icon: 'success',
        title: 'Update Successfully'
      }).then(() => {
        navigate("/profile");
      })
    );
  };

  useEffect(() => {
    setTelp(users.phone);
    setPassword(users.password);
    setEmail(users.email);
    setName(users.name);
  }, []);
  return (
    <>
      <div className="menuTitle">
        <h1>Account Settings</h1>
      </div>
      <div className="menuSec">
        <form action="" onSubmit={coba}>
          <label>Username</label>
          <h3>{users.username}</h3>
          {/* <div className="name"> */}
          <label>Name Toko</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>No. Telephone</label>
          <input
            type="number"
            value={telp}
            disabled
            placeholder={users.phone}
            onInput={(e) => setTelp(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Gender</label>
          <div className="gender">
            <div className="genderFlex">
              <label className="radio-container">
                <input className="radio" type="radio" name="gender" />
                <span className="checkmark">MEN</span>
              </label>
              <label className="radio-container">
                <input className="radio" type="radio" name="gender" />
                <span className="checkmark">WOMEN</span>
              </label>
            </div>
            <p>*There is no other gender besides these two</p>
          </div>
          <label>Profile Images</label>
          <div className="chsimg">
            <label className="img-container">
              <input
                className="flimg"
                type="file"
                // value={gambar}
                onChange={(e) => setGambar(e.target.files[0])}
                required
              />
              <span className="choose">
                <i className="fa-solid fa-upload"></i>Choose File
              </span>
            </label>
            <p>*Can only select JPG, JPEG, and PNG</p>
          </div>
          <button type="submit">
            <i className="fa-solid fa-pen-to-square"></i>
            <span> Edit Account</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingAkun;
