import axios from "axios";
import { API } from "./index";

export const fetchPosts = () => {
  return axios.get(`${API}/posts`).then((response) => response.data);
};

export const createPost = (post) => {
  return axios.post(`${API}/posts`, post).then((response) => response.data);
};

export const deletePost = (id) => {
  return axios.delete(`${API}/posts/${id}`).then((response) => response.data);
};

export const updatePost = (post) => {
  return axios.put(`${API}/posts/${post.id}`, post).then((response) => response.data);
};
