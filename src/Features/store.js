import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import productReducer from "./product";
import transaction from "./transaction";
import usersReducer from "./users";

const rootReducer = {
  product: productReducer,
  users: usersReducer,
  cart: cart,
  transaction: transaction,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
