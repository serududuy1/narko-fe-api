import Header from "../Components/Header";
import "../Assets/css/App.css";

import his from "../Assets/img/slider1.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlltransaction,
  fetchAlltransactionById,
} from "../Features/transaction";
import CardRiwayat from "../Components/CardRiwayat";
import { fetchUserById } from "../Features/users";

const Topup = () => {
  const transaksi = useSelector(
    (state) => state.transaction.transactionById.data
  );
  const statusTransaksi = useSelector(
    (state) => state.transaction.statusTransaksi.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlltransaction());
    // fetchUserById()?
    dispatch(fetchUserById());
  }, [statusTransaksi]);

  return (
    <>
      <div className="menuTitle">
        <h1>Purchase History</h1>
      </div>
      <div className="menuHis">
        {transaksi?.map((rt, z) => (
          <CardRiwayat key={z} data={rt} />
        ))}
      </div>
    </>
  );
};

export default Topup;
