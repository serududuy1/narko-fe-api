import axios from "axios";

export default axios.create({
  // baseURL: "https://dummyjson.com/",
  baseURL: "https://narko-be-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
});
