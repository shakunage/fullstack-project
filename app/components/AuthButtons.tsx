import { Link } from "react-router";

export function AuthButtons() {
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
