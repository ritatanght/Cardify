import axios from "axios";

export const getAllCategories = () => {
  return axios.get("/api/categories").then((res) => res.data);
};

export const logInUser = (loginInfo) => {
  return axios.post("/api/auth/login", loginInfo).then((res) => res.data);
};

export const registerUser = (userInfo) => {
  return axios.post("/api/users", userInfo);
};

export const createSet = (setData)=>{
 return axios.post("/api/sets/create", setData);
}

export const getSet = (setId)=>{
  return axios.get(`/api/sets/${setId}`).then(res =>res.data)
}