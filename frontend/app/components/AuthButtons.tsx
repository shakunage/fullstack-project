import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { navigateToHome } from "~/utils/navigateToHome";

export function AuthButtons() {
  const result = useQuery({
    queryKey: ["authcheck"],
    queryFn: () =>
      axios
        .get("http://localhost:9998/backend/authcheck", { withCredentials: true })
        .then((res) => res.data),
  });

  let username = result.data;

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:9998/backend/logout",
        { withCredentials: true } // Important: this ensures cookies are sent
      );
      // Update local state
      username = undefined;
      alert("Logged out successfully!");
      void navigateToHome();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (result.isLoading) {
    return <>loading..</>;
  }

  if (!username) {
    return (
      <div className="ml-auto flex items-center gap-3">
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <>
      <span>Welcome, {username}!</span>
      <button
        onClick={handleLogout}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </>
  );
}
