import Cookies from "js-cookie";
import { useForm } from "@tanstack/react-form";
import { signupService } from "~/services/backendServices/signupService";
import { navigateToHome } from "~/utils/navigateToHome";


export function useSignup() {
    return useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            const token = await signupService(value.name, value.email, value.password);
            if (!token) {
                return;
            }
            Cookies.set("token", token, { secure: true, sameSite: "Strict" });
            alert("Signup successful!");
            void navigateToHome();
        },
    });
}
