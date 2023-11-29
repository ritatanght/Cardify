import axios from "axios";

export const getAllCategories = () => {
  return axios.get("/api/categories").then((res) => res.data);
};

export const logInUser = (loginInfo) => {
  return axios.post("/api/auth/login", loginInfo).then((res) => res.data);
};
