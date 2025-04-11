import axios from "axios";

const API_URL = "http://localhost:9998/backend";

export async function checkAuthStatus() {
  return axios
        .get(`${API_URL}/authcheck`, { withCredentials: true })
        .then((res) => res.data);
}

export async function logoutUser() {
    return axios
        .get(`${API_URL}/logout`, { withCredentials: true })
        .then((res) => res.data);
}



