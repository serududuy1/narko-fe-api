import Card from "../Components/Card";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchAllProducts,
  fetchUpdateQuantity,
} from "../Features/product";
import { fetchAddCart } from "../Features/cart";
import Swal from "sweetalert2";
import POPORO from "../Assets/img/slider1.png";
import { fetchAddWishlist, fetchSellerId } from "../Features/users";
import { fetchAddtransaction } from "../Features/transaction";
import Cookies from "universal-cookie";

const DetailProduk = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const namedd = new URLSearchParams(window.location.search).get("id");
  const [quantity, setQuantity] = useState("");
  const [ids, setIds] = useState("");
  const [pilih, setPilih] = useState(0);
  const [lokasi, setLokasi] = useState("");
  const detailProduk = useSelector(
    (state) => state.product.productsDetail.data
  );
  const detailUsers = useSelector((state) => state.users.users.data);
  const isSeller = useSelector((state) => state.product?.penjual);
  const sellerId = useSelector(
    (state) => state?.product?.productsDetail?.data?.idPenjual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Imeji = () => {
    Swal.fire({
      showConfirmButton: false,
      imageUrl: `${url + detailProduk?.images}`,
      imageWidth: "100%",
    });
  };

  const addCart = (e) => {
    e.preventDefault();
    // console.log("cart");
    const datas = {
      idUser: detailUsers.id,
      idProduct: detailProduk.id,
      quantity: quantity,
    };
    dispatch(fetchAddCart(datas)).then((response) => {
      Swal.fire({
        title: "Success!",
        text: "Berhasil memasukkan data ke Cart",
        icon: "success",
      }).then((res) => {
        const id = detailProduk.id;
        const qtt = { quantity: parseInt(detailProduk.quantity - quantity) };
        dispatch(fetchUpdateQuantity({ id, qtt })).then((response) => {
          navigate("/cart");
        });
      });
    });
  };

  const addwishlist = (e) => {
    e.preventDefault();
    // console.log("check");
    const datas = {
      idUser: detailUsers.id,
      idProduct: detailProduk.id,
    };
    dispatch(fetchAddWishlist(datas)).then((response) => {
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambah wishlist",
        icon: "success",
      }).then(navigate("/wishlist"));
    });
  };

  const totalHargas =
    parseInt(quantity) * parseInt(detailProduk?.price) + 15000;
  // console.log(totalHargas);
  const addCheckout = (e) => {
    e.preventDefault();
    // console.log("checkout");

    if (!token) {
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
        title: "Login Required",
      }).then(navigate("/login"));
    } else {
      const datas = {
        idUser: detailUsers.id,
        idProduct: detailProduk.id,
        idPenjual: isSeller,
        quantity: quantity,
        idShipping: lokasi,
        totalPrice: totalHargas,
        statusTransaksi: "NOT YET PAID",
      };
      const id = detailProduk.id;
      const qtt = { quantity: parseInt(detailProduk.quantity - quantity) };
      dispatch(fetchAddtransaction(datas)).then(() => {
        dispatch(fetchUpdateQuantity({ id, qtt })).then((response) => {
          navigate("/checkout");
        });
      });
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const produkKosong = () => {
    Swal.fire({
      title: "Gagal!",
      text: "STOK KOSONG!",
      icon: "error",
    });
  };

  const url = "http:\\\\narko-be-production.up.railway.app/\\";

  useEffect(() => {
    setIds(sellerId);
    dispatch(fetchProductById(namedd));
    dispatch(fetchSellerId(isSeller));
  }, [sellerId]);

  return (
    <>
      <Header />
      <div className="section">
        <div className="container-card">
          <div className="card-title">
            <div className="card-img">
              <button className="btnDetImg" onClick={Imeji}>
                <img
                  className="imgPrdct"
                  src={url + detailProduk?.images}
                  alt=""
                />
              </button>
              <div className="shareSection">
                <div className="shareIcon">
                  <p>Share :</p>
                  <button>
                    <i className="tw fa-brands fa-square-twitter"></i>
                  </button>
                  <button>
                    <i className="wa fa-brands fa-square-whatsapp"></i>
                  </button>
                  <button>
                    <i className="fb fa-brands fa-square-facebook"></i>
                  </button>
                  <button>
                    <i className="rd fa-brands fa-square-reddit"></i>
                  </button>
                  <button>
                    <i className="pr fa-brands fa-square-pinterest"></i>
                  </button>
                </div>
                <div className="wlBtn">
                  <button onClick={addwishlist}>
                    <i className="fa-solid fa-heart"></i>
                    <span> Add to Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
            <span className="lineMobile"></span>
            <div className="contentTitle">
              <div className="content-card">
                <h1>{detailProduk?.nameProducts}</h1>
              </div>
              <div className="content-isi">
                <p className="price">{rupiah(detailProduk?.price)}</p>
                <p>
                  Stock : <span>{detailProduk?.quantity}</span>
                </p>
                <div className="favorit">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
              <form
                action=""
                onSubmit={
                  pilih === "1"
                    ? addCheckout
                    : pilih === "2"
                    ? addCart
                    : addCart
                }
              >
                <div className="kurir">
                  <div className="kurir-head">
                    <p>Delivery</p>
                  </div>
                  <div className="kurir-content">
                    <select
                      name="kurir"
                      id="kurir"
                      onChange={(e) => setLokasi(e.target.value)}
                      defaultValue={""}
                      required
                    >
                      <option value="" disabled>
                        Select Delivery Location
                      </option>
                      <option value="1">Jakarta</option>
                      <option value="2">Bogor</option>
                      <option value="3">Depok</option>
                      <option value="4">Tangerang</option>
                      <option value="5">Bekasi</option>
                    </select>
                  </div>
                </div>
                <div className="checkout-card">
                  <div className="content-beli-header">
                    <h5>Quantity</h5>
                    <input
                      type="number"
                      name="kuantiti"
                      id="kuantiti"
                      placeholder="1"
                      max={detailProduk?.quantity}
                      min={1}
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="beli-btn">
                    {detailProduk?.quantity > 0 ? (
                      <>
                        <button
                          className="btn btn-beli"
                          onClick={(e) => setPilih("1")}
                        >
                          Buy Now!
                        </button>
                        <button
                          className="btn btn-keranjang"
                          onClick={(e) => setPilih("2")}
                        >
                          <i className="fa-solid fa-cart-shopping"></i> Add to
                          Cart
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-beli"
                          // disabled
                          onClick={produkKosong}
                        >
                          Buy Now!
                        </button>
                        <button
                          // disabled
                          className="btn btn-keranjang"
                          onClick={produkKosong}
                        >
                          <i className="fa-solid fa-cart-shopping"></i> Add to
                          Cart
                        </button>
                      </>
                    )}
                    {/* <button
                      className="btn btn-beli"
                      onClick={(e) => setPilih("1")}
                    >
                      Buy Now!
                    </button>
                    <button
                      className="btn btn-keranjang"
                      onClick={(e) => setPilih("2")}
                    >
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="profileSection">
          <div className="infoProf">
            <img className="imgProf" src={POPORO} alt="Profile" />
            <div className="infoAcc">
              <h3>TOKO MASIH MURAH</h3>
              <p>Created since 2022</p>
              <Link
                className="vstStore"
                to={`/seller?id=${detailProduk?.idPenjual}`}
              >
                <i className="fa-solid fa-store"></i>
                <span>Visit Store</span>
              </Link>
            </div>
          </div>
          <span className="profLine"></span>
          <div className="infoProfAcc"></div>
        </div>
        <div className="descSection">
          <div className="specTitle">
            <h3>Product Specification</h3>
          </div>
          <div className="specInfo">
            <span>
              <p>Stock</p>:<p className="inf">{detailProduk?.quantity}</p>
            </span>
          </div>
          <div className="descTitle">
            <h3>Product Description</h3>
          </div>
          <div className="descInfo">
            <p>{detailProduk?.description}</p>
          </div>
        </div>
        <div className="commentSection">
          <div className="commentTitle">
            <h3>Comment</h3>
          </div>
          <div className="commentCard">
            <div className="commentProf">
              <img src={POPORO} alt="" />
              <div className="cmtPrNm">
                <h4>Andreas Yonti</h4>
                <p>16.23 27-11-2024</p>
              </div>
            </div>
            <div className="commentSect">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
                eius iure assumenda dolorem commodi ut eum perspiciatis
                recusandae suscipit, labore atque ad ea expedita distinctio unde
                et enim autem quos laudantium sint asperiores! Nisi esse totam
                dolore laudantium consequatur, deserunt temporibus quae libero
                nulla numquam, error dignissimos dolor aliquam. Explicabo magni
                eum voluptatem eveniet harum consequuntur qui praesentium
                officiis, ratione tenetur cupiditate, perferendis, voluptates
                pariatur ab minus amet maiores necessitatibus eos architecto.
                Nulla deleniti sequi dolores totam sunt numquam accusamus fuga
                quidem est impedit vero fugit nihil animi nam eligendi,
                similique voluptatibus corporis nostrum quis! Aliquam officia
                possimus debitis placeat!
              </p>
            </div>
          </div>

          <div className="commentCard">
            <div className="commentProf">
              <img src={POPORO} alt="" />
              <div className="cmtPrNm">
                <h4>Aci Kumala</h4>
                <p>05.02 11-09-2023</p>
              </div>
            </div>
            <div className="commentSect">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Provident facere repudiandae suscipit enim amet sequi laborum
                repellat quod optio officia odio vero eveniet facilis ullam,
                possimus dolore ea ex accusantium excepturi quas iure adipisci
                sunt! Quis ut libero perferendis recusandae aspernatur quasi!
                Culpa eaque eius dicta distinctio quasi ex laborum deleniti
                soluta voluptatum. Nihil magnam tenetur numquam, temporibus
                obcaecati iure!
              </p>
            </div>
          </div>
          <div className="commentCard">
            <div className="commentProf">
              <img src={POPORO} alt="" />
              <div className="cmtPrNm">
                <h4>Cumalaka Acu</h4>
                <p>20.17 28-08-2023</p>
              </div>
            </div>
            <div className="commentSect">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio fugiat eaque dolorum iure repudiandae, doloremque
                quia temporibus voluptas voluptatibus eius. Odio ipsa quia
                dolorum quisquam quidem dignissimos consectetur nesciunt enim?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailProduk;
