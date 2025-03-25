import { Link } from "react-router";
import { AuthButtons } from "./AuthButtons";
import { useNavigate } from "react-router"; 
import { useQuery } from '@tanstack/react-query'
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
        <div className="flex items-center gap-4 px-4">
          <AuthButtons />
      </div>
    </div>
  );
}
