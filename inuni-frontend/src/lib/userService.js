import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
