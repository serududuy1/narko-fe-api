import { Link } from "react-router-dom";

const Card = (props) => {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  
  const url = "http:\\\\localhost:8000\\";
  return (
    <Link className="detail" to={`/detailProduk/search?id=${props.id}`}>
      <div className="card">
        <div className="foto">
          <img src={url + props?.images} />
        </div>
        <div className="desc-card">
          <div className="container-desc-card">
            <h3>{props.title}</h3>
          </div>
          <div className="price">
            <p>{rupiah(props.price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
