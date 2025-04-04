import axios from "axios";

export async function checkAuthStatus() {
  return axios
        .get("http://localhost:9998/backend/authcheck", { withCredentials: true })
        .then((res) => res.data);
}

export async function loginUser() {
    return axios
        .get("http://localhost:9998/backend/login", { withCredentials: true })
        .then((res) => res.data);
}

export async function logoutUser() {
    return axios
        .get("http://localhost:9998/backend/logout", { withCredentials: true })
        .then((res) => res.data);
}



