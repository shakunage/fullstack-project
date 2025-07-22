import { Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { AuthButtons } from './AuthButtons';
import { useAuth } from '~/hooks/useAuth';

type Dropdown = {
  loginRequired: boolean;
  tabs: TopBarElement[];
};

type TopBarElement = {
  title: string;
  href: string;
  dropdown?: Dropdown;
};

const topBarElements: { [key: string]: TopBarElement } = {
  home: {
    title: 'Home',
    href: '/',
  },
  games: {
    title: 'Games',
    href: '/games',
    dropdown: {
      loginRequired: true,
      tabs: [
        {
          title: 'Favorited Games',
          href: '/games/favoritegames/',
        },
      ],
    },
  },
  standings: {
    title: 'Standings',
    href: '/standings',
  },
  players: {
    title: 'Players',
    href: '/players',
    dropdown: {
      loginRequired: false,
      tabs: [
        {
          title: 'Skaters',
          href: '/players/skaters',
        },
        {
          title: 'Goalies',
          href: '/players/goalies',
        },
      ],
    },
  },
};

export function TopBar() {
  const { username } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (key: string) => {
    setClickedDropdown((prev) => (prev === key ? null : key));
    setOpenDropdown(key);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (topBarRef.current && !topBarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setClickedDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between bg-gray-100 p-3" ref={topBarRef}>
      <ul className="flex flex-row bg-gray-100 p-3">
        {Object.keys(topBarElements).map((key) => {
          const element = topBarElements[key];
          const hasDropdown = element.dropdown;
          const needsLogin = element.dropdown?.loginRequired;
          const isDropdownOpen = openDropdown === key;

          const handleItemClick = (e: React.MouseEvent) => {
            if (hasDropdown && (!needsLogin || username)) {
              e.preventDefault();
              handleDropdownToggle(key);
            }
          };

          const handleMouseEnter = () => {
            if (hasDropdown && (!needsLogin || username)) {
              setOpenDropdown(key);
            }
          };

          const handleMouseLeave = () => {
            if (clickedDropdown !== key) {
              setOpenDropdown(null);
            }
          };

          return (
            <li
              key={key}
              className="group relative flex items-center gap-3 self-stretch p-3 leading-normal text-gray-700 hover:underline dark:text-blue-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={element.href} onClick={handleItemClick}>
                {element.title}
                {/* Only show arrow if there's a dropdown and user is logged in */}
                {hasDropdown && (!needsLogin || username) && <span className="ml-1">∨</span>}
              </Link>

              {hasDropdown && (!needsLogin || username) && (
                <div
                  className={`absolute top-full left-0 w-48 bg-white shadow-md ${
                    isDropdownOpen ? 'block' : 'hidden'
                  }`}
                >
                  <ul className="list-none p-0 m-0">
                    {' '}
                    {/* Ensure ul has no default padding/margin */}
                    {element.dropdown?.tabs.map((item: TopBarElement, index: number) => (
                      <li key={index}>
                        {' '}
                        {/* Remove classes from li */}
                        <Link
                          to={item.href}
                          className="block p-2 hover:bg-gray-100"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {' '}
                          {/* Add classes to Link */}
                          {item.title}
                        </Link>
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
