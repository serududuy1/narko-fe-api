import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await api.get("/product/v1");
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductsById",
  async (id) => {
    try {
      const response = await api.get(`/product/v1/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchProductByUser = createAsyncThunk("users/user", async (id) => {
  try {
    const response = await api.get(`/product/v1/seller/allproduct`, {
      headers: {
        Authorization: cookies.get("token"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const fetchPostProduct = createAsyncThunk(
  "products/post",
  async (datas) => {
    try {
      const response = await api.post(`/product/v1/create`, datas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchCariProduk = createAsyncThunk(
  "products/Cari",
  async (kata) => {
    try {
      const response = await api.get(`/product/v1/cari/product=${kata}`);
      if (kata === "") {
        localStorage.removeItem("search");
        return response.data;
      } else {
        localStorage.setItem("search", response.data);
        return response.data;
      }
    } catch (err) {
      return err;
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "products/post",
  async (datas) => {
    try {
      const response = await api.delete(`/product/v1/delete/${datas}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);
export const fetchUpdateQuantity = createAsyncThunk(
  "products/post",
  async ({ id, qtt }) => {
    try {
      const response = await api.put(`/product/v1/update/product=${id}`, qtt);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  products: [],
  productsFill: [],
  productsDetail: [],
  productsCreate: [],
  productsDelete: [],
  productsUpdate: [],
  penjual: [],
  loading: false,
  error: null,
  post: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // =================== GET PRODUCTS ============================
    [fetchAllProducts.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      return { ...state, loading: false, products: action.payload };
    },
    [fetchAllProducts.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    // =================== GET PRODUCTS ============================
    [fetchProductByUser.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchProductByUser.fulfilled]: (state, action) => {
      return { ...state, loading: false, post: action.payload };
    },
    [fetchProductByUser.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    // =================== GET PRODUCTS ============================
    [fetchCariProduk.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchCariProduk.fulfilled]: (state, action) => {
      return { ...state, loading: false, products: action.payload };
    },
    [fetchCariProduk.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //     ===================== GET PRODUCT BY ID ========================
    [fetchProductById.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchProductById.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        productsDetail: action.payload,
        penjual: action.payload.data.idPenjual,
      };
    },
    [fetchProductById.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //     ===================== GET PRODUCT BY ID ========================
    [fetchPostProduct.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchPostProduct.fulfilled]: (state, action) => {
      return { ...state, loading: false, productsCreate: action.payload };
    },
    [fetchPostProduct.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },

    //     ===================== UPDATE QUANTITY ========================
    [fetchUpdateQuantity.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchUpdateQuantity.fulfilled]: (state, action) => {
      return { ...state, loading: false, productsUpdate: action.payload };
    },
    [fetchUpdateQuantity.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //     ===================== GET PRODUCT BY ID ========================
    [fetchDeleteProduct.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchDeleteProduct.fulfilled]: (state, action) => {
      return { ...state, loading: false, productsDelete: action.payload };
    },
    [fetchDeleteProduct.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
  },
});

export const { createProduct } = productsSlice.actions;
export const isLoading = (state) => state.products.loading;

export default productsSlice.reducer;
