import { Link } from "react-router";
import { AuthButtons } from "./AuthButtons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import axios from "axios";

type TopBarElement = {
  title: string;
  href: string;
};

const topBarElements: { [key: string]: TopBarElement } = {
  home: {
    title: "Home",
    href: "/",
  },
  games: {
    title: "Games",
    href: "/games",
  },
  about: {
    title: "About",
    href: "/about",
  },
  contact: {
    title: "Contact",
    href: "/contact",
  },
};

export function TopBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // The token is in the HttpOnly cookie, so we just make the request
        // The browser will automatically include the cookie
        const response = await axios.get(
          "http://localhost:9998/backend/authcheck", 
          { withCredentials: true }
        );
        
        // If we get here, the request was successful
        if (response.data) {
          setIsAuthenticated(true);
          // The response should contain the username
          setUsername(response.data.username || response.data);
        } else {
          setIsAuthenticated(false);
          setUsername("");
        }
      } catch (error) {
        // If there's an error, the user is not authenticated
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setUsername("");
      } finally {
        setLoading(false);
      }
    };
  
    checkAuthentication();
  }, []); // Empty dependency array means this runs once on component mount

  const handleLogout = async () => {
    try {
      await axios.get(
        "http://localhost:9998/backend/logout", 
        { withCredentials: true } // Important: this ensures cookies are sent
      );
      // Update local state
      setIsAuthenticated(false);
      setUsername("");
      alert("Logged out successfully!");
      void navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex flex-row justify-between bg-gray-100 p-3">
      <ul className="flex flex-row bg-gray-100 p-3">
        {Object.keys(topBarElements).map((key) => (
          <li
            key={key}
            className="group flex items-center gap-3 self-stretch p-3 leading-normal text-gray-700 hover:underline dark:text-blue-500"
          >
            <Link to={topBarElements[key].href}>{topBarElements[key].title}</Link>
          </li>
        ))}
      </ul>
      
      {loading ? (
        <div className="flex items-center px-4">Welcome, {username}</div>
      ) : isAuthenticated ? (
        <div className="flex items-center gap-4 px-4">
          <span>Welcome, {username}!</span>
          <button 
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
