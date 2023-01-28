import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostProduct } from "../Features/product";
import Swal from "sweetalert2";

const PostSeller = () => {
  const [nm, setNm] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState([]);
  const iduser = useSelector((state) => state?.users?.users?.data?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const kirim = (e) => {
    e.preventDefault();
    const datas = {
      nameProducts: nm,
      title: brand,
      quantity: stok,
      description: desc,
      price: harga,
      gambar: gambar,
      idPenjual: iduser,
    };
    dispatch(fetchPostProduct(datas)).then((res) => {
      if (res.payload.message === "product created") {
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
          title: "Posting Successfully",
        }).then(navigate("/sellerinfo"));
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
          title: "Posting Failed",
        });
      }
    });
  };

  const ImageF1 = function(e) {
    setGambar(e.target.files[0])
  }

  const ImageF2 = function(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Header />
      <div className="psContainer">
        <div className="psTitle">
          <h1>
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
            <span> POST PRODUCT</span>
          </h1>
          <span className="linePost"></span>
        </div>
        <form onSubmit={kirim}>
          <div className="psProductInfo">
            <div className="piTitle">
              <h2>Product Information</h2>
            </div>
            <div className="piFoto">
              <div className="div">
                <label className="file">
                  <input
                    type="file"
                    onChange=
                    // {e => {this.ImageF1(e); this.ImageF2(e)}}
                    {(e) => setGambar(e.target.files[0])}
                    id="IMGPN"
                  />
                  <span>
                    <i className="fa-solid fa-camera"></i>Upload Image
                  </span>
                  <img src={file}/>
                </label>
              </div>
              <div className="dov">
                <ul>
                  <li>
                    <p>*File Size: 20MB Max</p>
                  </li>
                  <li>
                    <p>*Format: JPG, JPEG, PNG, WEBP</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="piProductInfo">
              <label>Product Name</label>
              <input
                type="text"
                value={nm}
                onChange={(e) => setNm(e.target.value)}
              />
              <label>Product Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label>Product Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="psSellingInfo">
            <div className="siTitle">
              <h2>Selling Information</h2>
            </div>
            <div className="siInformation">
              <label>Price</label>
              <div className="priceInfo">
                <span>Rp. </span>
                <input
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
              <label>Stock</label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
          </div>
          <div className="btnPS">
            <button type="submit">POST PRODUCT</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostSeller;
