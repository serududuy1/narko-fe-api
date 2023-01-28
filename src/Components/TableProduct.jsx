import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDeleteProduct, fetchProductByUser } from "../Features/product";
import Swal from "sweetalert2";

const TableProduct = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnEdit = (e) => {
    e.preventDefault();
    navigate("/UpdatePost");
  };

  useEffect(() => {
    dispatch(fetchProductByUser());
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "Idr",
    }).format(number);
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td className="tp">{rupiah(props.price)}</td>
      <td className="tq">{props.quantity}</td>
      <td className="ta">
        <button onClick={btnEdit}>Edit</button>
      </td>
    </tr>
  );
};
export default TableProduct;
