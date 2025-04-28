import { Link } from "react-router";
import { AuthButtons } from "./AuthButtons";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";

type DropdownItem = {
  title: string;
  href: string;
};

type TopBarElement = {
  title: string;
  href: string;
  dropdown?: DropdownItem[];
};

const topBarElements: { [key: string]: TopBarElement } = {
  home: {
    title: "Home",
    href: "/",
  },
  games: {
    title: "Games",
    href: "/games",
    dropdown: [
      {
        title: "Favorited Games",
        href: "/games/favoritegames/",
      },
    ],
  },
  teams: {
    title: "Teams",
    href: "/teams",
  },
  players: {
    title: "Players",
    href: "/players",
    dropdown: [
      {
        title: "Skaters",
        href: "/players/skaters/",
      },
      {
        title: "Goalies",
        href: "/players/goalies/",
      },
    ],
  },
  bettinglines: {
    title: "Betting Lines",
    href: "/bettinglines",
  },
};

export function TopBar() {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div className="flex flex-row justify-between bg-gray-100 p-3">
      <ul className="flex flex-row bg-gray-100 p-3">
        {Object.keys(topBarElements).map((key) => {
          const element = topBarElements[key];
          const hasDropdown = element.dropdown && username;

          return (
            <li
              key={key}
              className="group relative flex items-center gap-3 self-stretch p-3 leading-normal text-gray-700 hover:underline dark:text-blue-500"
            >
              <Link to={element.href}>
                {element.title}
                {/* Only show arrow if there's a dropdown and user is logged in */}
                {hasDropdown && <span className="ml-1">∨</span>}
              </Link>

              {hasDropdown && (
                <div className="absolute top-full left-0 hidden w-48 bg-white shadow-md group-hover:block">
                  <ul>
                    {element.dropdown?.map((item: DropdownItem, index: number) => (
                      <li key={index} className="p-2 hover:bg-gray-100">
                        <Link to={item.href}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 px-4">
        <AuthButtons />
      </div>
    </div>
  );
}
