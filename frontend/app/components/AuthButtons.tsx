import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store/store";
import { fetchStatus, logout } from "../store/authSlice";
import { navigateToHome } from "~/utils/navigateToHome";

export function AuthButtons() {
  const username = useSelector((state: RootState) => state.auth.username)
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    void navigateToHome();
  };

  const initialAuthQuery = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      await dispatch(fetchStatus());
      return "Fetched auth status";
    },
  });

  if (initialAuthQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!username) {
    return (
      <div className="ml-auto flex items-center gap-3 relative">
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Sign Up
          </Link>
        </div>
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
