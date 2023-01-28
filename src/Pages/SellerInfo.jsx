import HeaderSell from "../Components/HeaderSeller";
import Footer from "../Components/Footer";

import LOG from "../Assets/img/Log.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductByUser } from "../Features/product";
import TableProduct from "../Components/TableProduct";
import ConfirmProduct from "../Components/ConfirmProduct";

const SellerInfo = () => {
  const prodak = useSelector((state) => state.product.post.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductByUser());
  }, []);

  return (
    <>
      <HeaderSell />
      <div className="sliContainer">
        <div className="sliConfirm">
          <div className="sliProductTitle">
            <h2>Purchase Confirmation</h2>
          </div>
          <table className="sliTable">
            <thead>
              <tr className="trHead">
                <th className="tpn">Product Name</th>
                <th className="tp">Price</th>
                <th className="tq">Quantity</th>
                <th className="ta">Action</th>
              </tr>
            </thead>
            <tbody>
              {prodak?.map((data, i) => (
                <ConfirmProduct
                  key={i}
                  name={data.nameProducts}
                  price={data.price}
                  quantity={data.quantity}
                  id={data.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="sliNews">
          <div className="snTitle">
            <h2>News</h2>
            <div className="button">
              <span>Other </span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div className="snArticle">
            <i className="fa-solid fa-file-circle-xmark"></i>
            <p>Undefined</p>
          </div>
        </div>
        <div className="sliLog">
          <div className="slTitle">
            <h2>Selling</h2>
            <div className="button">
              <span>Other </span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
          <div className="slContent">
            <div className="slLeft">
              <img src={LOG} alt="Log" />
            </div>
            <div className="slRight">
              <div className="slrUp">
                <div className="slrCmp">
                  <h3>
                    Total Visitors{" "}
                    <i className="fa-regular fa-circle-question"></i>
                  </h3>
                  <h2>0</h2>
                  <p>vs Yesterday 0,00%</p>
                </div>
                <div className="slrCmp">
                  <h3>
                    Product Viewed{" "}
                    <i className="fa-regular fa-circle-question"></i>
                  </h3>
                  <h2>0</h2>
                  <p>vs Yesterday 0,00%</p>
                </div>
              </div>
              <span className="slrLine"></span>
              <div className="slrDown">
                <div className="slrCmp">
                  <h3>
                    Order <i className="fa-regular fa-circle-question"></i>
                  </h3>
                  <h2>0</h2>
                  <p>vs Yesterday 0,00%</p>
                </div>
                <div className="slrCmp">
                  <h3>
                    Level of Controversy{" "}
                    <i className="fa-regular fa-circle-question"></i>
                  </h3>
                  <h2>0</h2>
                  <p>vs Yesterday 0,00%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sliFeatures">
          <div className="sfTitle">
            <h2>Features</h2>
          </div>
          <div className="sfContent">
            <div className="sfCard">
              <div className="scLogo">
                <div className="sfCardImg">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </div>
              </div>
              <h3>My Shop Voucher</h3>
              <p>Give discount vouchers to Buyers & increase orders</p>
            </div>
            <div className="sfCard">
              <div className="scLogo">
                <div className="sfCardImg">
                  <i className="fa-solid fa-tags"></i>
                </div>
              </div>
              <h3>Store Promo</h3>
              <p>Arrange product discounts & increase sales</p>
            </div>
            <div className="sfCard">
              <div className="scLogo">
                <div className="sfCardImg">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
              </div>
              <h3>Discount Package</h3>
              <p>
                Increase the average purchase value of Buyers in one order by
                offering Discount Packages
              </p>
            </div>
            <div className="sfCard">
              <div className="scLogo">
                <div className="sfCardImg">
                  <i className="fa-solid fa-bolt"></i>
                </div>
              </div>
              <h3>Flash Sale</h3>
              <p>
                Increase product sales by providing a limited time discount at
                your store
              </p>
            </div>
          </div>
        </div>
        <div className="sliProduct">
          <div className="sliProductTitle">
            <h2>0 Product</h2>
            <Link className="button" to="/postseller">
              <i className="fa-solid fa-plus"></i>
              <span> Add Product</span>
            </Link>
          </div>
          <table className="sliTable">
            <thead>
              <tr className="trHead">
                <th className="tpn">Product Name</th>
                <th className="tp">Price</th>
                <th className="tq">Quantity</th>
                <th className="ta">Action</th>
              </tr>
            </thead>
            <tbody>
              {prodak?.map((data, i) => (
                <TableProduct
                  key={i}
                  name={data.nameProducts}
                  price={data.price}
                  quantity={data.quantity}
                  id={data.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerInfo;
