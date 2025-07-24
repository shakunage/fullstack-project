# NHL Games Browser

Browse past and upcoming NHL games and detailed statistics pertaining to them. You can also view present and past standings as well as statistics for current top goalies and skaters. Data is retrieved from the NHL API: https://github.com/Zmalski/NHL-API-Reference

The app supports user registration and saving past games into user's favorites.  

## Tech stack

- Frontend: React Router v7 framework mode
- Backend: Node.js (express)
- Database (auth): PostgreSQL
- Database (favorited games): MongoDB (mongoose)
- Caching: Redis (used for caching information about favorite games)
- Reverse Proxy: nginx (also used for caching data fetched from the NHL API)

The frontend utilizes server-side rendering (SSR) for most pages, meaning that the frontend server first sends a HTML with no content, and later hydrates it with data that it fetched from the backend server. This reduces the number of network round trips that occur when the user loads a page in the browser. SSR also adds an extra layer of separation between the backend and the browser. 

Data fetching is managed using TanStack Query, and the library is also used to manage global state (login status) across components. 

<Add a network graph for depicting the flow of data in the application>

## Development

## Build

## Production deployment

## Timekeeping