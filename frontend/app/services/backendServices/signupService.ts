import axios from "axios";

const API_URL = "http://localhost:9998/backend/signup";

export async function signupService(value: {name: string, email: string, password: string,}): Promise<string | false> {
    try {
        const { name, email, password } = value;
        const response = await axios.post(API_URL, { name, email, password });
        const token  = response.data;
        return token;
    } catch (error) {
        console.error("Signup failed:", error);
        alert("Signup failed. Please try again.");
        return false;
    }
}