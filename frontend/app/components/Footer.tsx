import React from 'react';
import { Link } from 'react-router';

type FooterElement = {
  title: string;
  href: string;
};

const footerElements: { [key: string]: FooterElement } = {
  about: {
    title: 'About',
    href: '/about',
  },
  contact: {
    title: 'Contact',
    href: '/contact',
  },
};

export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-gray-100 p-1 mt-auto">
      <ul className="flex flex-row items-center gap-2 text-gray-700">
        {Object.keys(footerElements).map((key, index, array) => {
          const element = footerElements[key];
          return (
            <React.Fragment key={key}>
              <li className="hover:underline dark:text-blue-500">
                <Link to={element.href}>{element.title}</Link>
              </li>
              {index < array.length - 1 && <span>|</span>}
            </React.Fragment>
          );
        })}
      </ul>
    </footer>
  );
}
