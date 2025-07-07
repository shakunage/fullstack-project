import Cookies from "js-cookie";
import { useForm } from "@tanstack/react-form";
import { loginUser } from "../services/backendServices/loginService";
import { navigateToHome } from "~/utils/navigateToHome";


export function useLogin() {
    return useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            const token = await loginUser(value.email, value.password);
            if (!token) {
                console.error("Login failed. token value is:", token);
                return;
            }
            Cookies.set("token", token, { secure: true, sameSite: "Strict" });
            alert("Login successful!");
            navigateToHome();
    },
  });
}
