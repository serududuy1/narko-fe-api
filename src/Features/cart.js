import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import api from "./api/api";
const cookies = new Cookies();

export const fetchAllcarts = createAsyncThunk(
  "carts/fetchAllcarts",
  async () => {
    try {
      const response = await api.get("/cart/v1/cart", {
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
export const fetchAllcartsById = createAsyncThunk(
  "carts/fetchAllcarts",
  async (datauser) => {
    try {
      const response = await api.get("/cart/v1/cart", {
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

export const fetchAddCart = createAsyncThunk(
  "cart/fetchAddCart",
  async (data) => {
    try {
      const response = await api.post(`/cart/v1/addCart`, data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchDeleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (idkeranjang) => {
    try {
      const response = await api.delete(`/cart/v1/cart/remove/${idkeranjang}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
export const fetchDeleteByUser = createAsyncThunk(
  "cart/deletebyuser",
  async () => {
    try {
      const response = await api.delete(`/cart/v1/cart/deletebyuser`, {
        headers: {
          Authorization: cookies.get("token"),
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const initialState = {
  carts: [],
  cartsDetail: [],
  cartsById: [],
  cartsDestroy: [],
  cartsDeleteByUser: [],
};
const cartsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    // =================== GET cartS ============================
    [fetchAllcarts.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAllcarts.fulfilled]: (state, action) => {
      return { ...state, loading: false, carts: action.payload };
    },
    [fetchAllcarts.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchAddCart.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAddCart.fulfilled]: (state, action) => {
      return { ...state, loading: false, cartsDetail: action.payload };
    },
    [fetchAddCart.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchAllcartsById.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAllcartsById.fulfilled]: (state, action) => {
      return { ...state, loading: false, cartsById: action.payload };
    },
    [fetchAllcartsById.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchDeleteCart.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchDeleteCart.fulfilled]: (state, action) => {
      return { ...state, loading: false, cartsDestroy: action.payload };
    },
    [fetchDeleteCart.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchDeleteByUser.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchDeleteByUser.fulfilled]: (state, action) => {
      return { ...state, loading: false, cartsDeleteByUser: action.payload };
    },
    [fetchDeleteByUser.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
  },
});

export const { createcart } = cartsSlice.actions;
export const isLoading = (state) => state.cart.loading;

export default cartsSlice.reducer;
