import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const fetchLogin = createAsyncThunk("users/loginUsers", async (data) => {
  try {
    const res = await api.post("/users/v1/login", data);
    if (res.data.token) {
      cookies.set("token", res.data.token);
      return res.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
});
export const fetchLogout = createAsyncThunk("users/topup", async () => {
  try {
    const response = await api.put(
      `/users/v1/logout`,
      {},
      {
        headers: {
          Authorization: cookies.get("token"),
        },
      }
    );
    cookies.remove("token");
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
});
export const fetchUserById = createAsyncThunk("users/usersbyid", async (id) => {
  try {
    const response = await api.get(`/users/v1/`, {
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

export const fetchSellerId = createAsyncThunk(
  "users/sellerId",
  async (idSeller) => {
    try {
      const response = await api.get(`/users/v1/idSeller/${idSeller}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchToko = createAsyncThunk("users/toko", async (id) => {
  try {
    const response = await api.get(`/users/v1/`, {
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
export const fetchAllUser = createAsyncThunk("users/user", async (id) => {
  try {
    const response = await api.get(`/users/v1/allData`, {
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

export const fetchUpdateUser = createAsyncThunk(
  "users/update",
  async (datas) => {
    try {
      const response = await api.put(`/users/v1/updateData`, datas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

export const fetchCreateUser = createAsyncThunk(
  "users/create",
  async (datas) => {
    try {
      const response = await api.post(`/users/v1/created`, datas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
);

export const fetchUpdateSaldo = createAsyncThunk(
  "users/topup",
  async (saldouser) => {
    try {
      const response = await api.put(
        `/users/v1/saldo`,
        {
          saldo: saldouser,
        },
        {
          headers: {
            Authorization: cookies.get("token"),
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);
export const fetchUpdateSaldoPenjual = createAsyncThunk(
  "users/topup",
  async ({ idsp, saldoPenjual }) => {
    // console.log(idsp, saldoPenjual);
    try {
      const response = await api.put(`/users/v1/saldoPenjual`, {
        saldo: saldoPenjual,
        id: idsp,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
);

export const fetchWishList = createAsyncThunk(
  "carts/fetchAllcarts",
  async (datauser) => {
    try {
      const response = await api.get("/users/v1/wishlist", {
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

export const fetchDeleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (idkeranjang) => {
    try {
      // console.log(idkeranjang);
      const response = await api.delete(
        `/users/v1/wishlist/remove/${idkeranjang}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const fetchAddWishlist = createAsyncThunk(
  "cart/fetchAddCart",
  async (data) => {
    try {
      const response = await api.post(`/users/v1/wishlist/add`, data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const initialState = {
  status: false,
  loading: false,
  error: null,
  data: [],
  usersId: [],
  users: [],
  saldo: [],
  saldoPenjual: [],
  lastRegister: false,
  seller: [],
  wishlist: [],
  wishlistAdd: [],
  deleteWishlist: [],
  lgt: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchLogin.fulfilled]: (state, action) => {
      if (!action.payload)
        return {
          ...state,
          loading: false,
          error: "Username atau Passsword Salah",
          status: true,
        };
      else
        return { ...state, loading: false, status: true, lastRegister: false };
    },
    [fetchLogin.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: false,
      };
    },
    [fetchLogout.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchLogout.fulfilled]: (state, action) => {
      if (!action.payload)
        return {
          ...state,
          loading: false,
          error: "Gagal logout",
          status: true,
        };
      else
        return { ...state, loading: false, status: true, lgt: action.payload };
    },
    [fetchLogout.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: false,
      };
    },
    // =================== GET wishlist ============================
    [fetchWishList.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchWishList.fulfilled]: (state, action) => {
      return { ...state, loading: false, wishlist: action.payload };
    },
    [fetchWishList.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchAddWishlist.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAddWishlist.fulfilled]: (state, action) => {
      return { ...state, loading: false, wishlistAdd: action.payload };
    },
    [fetchAddWishlist.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    //  ===================== GET cart CART BY ID USERS ========================
    [fetchDeleteWishlist.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchDeleteWishlist.fulfilled]: (state, action) => {
      return { ...state, loading: false, deleteWishlist: action.payload };
    },
    [fetchDeleteWishlist.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    [fetchUserById.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchUserById.fulfilled]: (state, action) => {
      return { ...state, loading: false, users: action.payload };
    },
    [fetchUserById.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    [fetchSellerId.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchSellerId.fulfilled]: (state, action) => {
      return { ...state, loading: false, seller: action.payload };
    },
    [fetchSellerId.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    [fetchToko.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchToko.fulfilled]: (state, action) => {
      return { ...state, loading: false, usersId: action.payload };
    },
    [fetchToko.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
    [fetchUpdateSaldo.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchUpdateSaldo.fulfilled]: (state, action) => {
      if (!action.payload)
        return {
          ...state,
          loading: false,
          error: "Saldo tidak diupdate",
          status: true,
        };
      else
        return {
          ...state,
          loading: false,
          status: true,
          saldo: action.payload,
        };
    },
    [fetchUpdateSaldo.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: false,
      };
    },
    [fetchUpdateSaldoPenjual.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchUpdateSaldoPenjual.fulfilled]: (state, action) => {
      if (!action.payload)
        return {
          ...state,
          loading: false,
          error: "Saldo Penjual tidak diupdate",
          status: true,
        };
      else
        return {
          ...state,
          loading: false,
          status: true,
          saldoPenjual: action.payload,
        };
    },
    [fetchUpdateSaldoPenjual.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: false,
      };
    },
    [fetchCreateUser.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      if (!action.payload)
        return {
          ...state,
          loading: false,
          error: "tidak bisa create data",
          status: true,
        };
      else
        return {
          ...state,
          loading: false,
          status: true,
          lastRegister: action.payload,
        };
    },
    [fetchCreateUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: false,
      };
    },
    [fetchAllUser.pending]: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    [fetchAllUser.fulfilled]: (state, action) => {
      return { ...state, loading: false, users: action.payload };
    },
    [fetchAllUser.rejected]: (state, action) => {
      return { ...state, loading: false, error: action.error };
    },
  },
});

export const { setAuthenticated, setError } = usersSlice.actions;

export const isLoading = (state) => state.users.loading;

export default usersSlice.reducer;
