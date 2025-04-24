import axios from "axios";

const API_URL = "http://localhost:9998/backend/login";

export async function loginUser(value: {email: string, password: string,}): Promise<string | false> {
    try {
        const { email, password } = value;
        const response = await axios.post(API_URL, { email, password });
        const token  = response.data;
        return token;
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
        return false;
    }
}