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

export const createSet = (setData) => {
  return axios.post("/api/sets/create", setData);
};

export const getSet = (setId) => {
  return axios.get(`/api/sets/${setId}`).then((res) => res.data);
};

export const searchSets = (query) => {
  return axios
    .get(`/api/search?query=${encodeURIComponent(query)}`)
    .then((res) => res.data);
};

export const getUserSets = () => {
  return axios.get("/api/sets/user").then((res) => res.data);
};

export const getUserFavorites = () => {
  return axios.get("/api/favorites").then((res) => res.data);
};

export const logOutUser = () => {
  return axios.post(`/api/auth/logout`);
};

export const deleteSetById = (setId) => {
  return axios.delete(`/api/sets/delete/${setId}`);
};

export const likeSet = (setId) => {
  return axios.post(`/api/favorites/${setId}`);
};

export const unlikeSet = (setId) => {
  return axios.delete(`/api/favorites/${setId}`);
};
