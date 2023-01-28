import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api/api";

import Cookies from "universal-cookie";
const cookies = new Cookies();
export const fetchAlltransaction = createAsyncThunk(
  "transaction/fetchAlltransaction",
  async () => {
    try {
      const response = await api.get("/transaksi/v1/transaksi", {
        headers: {
          Authorization: cookies.get("token"),
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const fetchAlltransactionById = createAsyncThunk(
  "transaction/fetchAlltransaction",
  async (datauser) => {
    try {
      const response = await api.get("/transaction/v1/transaction", {
        headers: {
          Authorization: cookies.get("token"),
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchAddtransaction = createAsyncThunk(
  "transaction/fetchAddtransaction",
  async (datas) => {
    try {
      const response = await api.post(`/transaksi/v1/addtransaksi`, datas);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchDeletetransaction = createAsyncThunk(
  "transaction/deletetransaction",
  async (idkeranjang) => {
    try {
      const response = await api.delete(
        `/transaction/v1/transaction/remove/${idkeranjang}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchStatusTransaction = createAsyncThunk(
  "transaction/updateStatus",
  async ({ idtransaksis }) => {
    try {
      // console.log(idtransaksis);
      const response = await api.put(
        `/transaksi/v1/transaksi/update/${idtransaksis}`,
        {
          statusTransaksi: "DONE",
        },
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const initialState = {
  transaction: [],
  transactionDetail: [],
  transactionById: [],
  transactionDestroy: [],
  statusTransaksi: [],
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: {
    // =================== GET transaction ============================
    [fetchAlltransaction.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAlltransaction.fulfilled]: (state, action) => {
      return { ...state, loading: false, transaction: action.payload };
    },
    [fetchAlltransaction.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    // =================== GET transaction ============================
    [fetchStatusTransaction.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchStatusTransaction.fulfilled]: (state, action) => {
      return { ...state, loading: false, statusTransaksi: action.payload };
    },
    [fetchStatusTransaction.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET transaction transaction BY ID USERS ========================
    [fetchAddtransaction.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAddtransaction.fulfilled]: (state, action) => {
      return { ...state, loading: false, transactionDetail: action.payload };
    },
    [fetchAddtransaction.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET transaction transaction BY ID USERS ========================
    [fetchAlltransactionById.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAlltransactionById.fulfilled]: (state, action) => {
      return { ...state, loading: false, transactionById: action.payload };
    },
    [fetchAlltransactionById.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET transaction transaction BY ID USERS ========================
    [fetchDeletetransaction.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchDeletetransaction.fulfilled]: (state, action) => {
      return { ...state, loading: false, transactionDestroy: action.payload };
    },
    [fetchDeletetransaction.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
  },
});

export const { createtransaction } = transactionSlice.actions;
export const isLoading = (state) => state.transaction.loading;

export default transactionSlice.reducer;
