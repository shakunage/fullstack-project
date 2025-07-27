# NHL Games Browser

Browse past and upcoming NHL games and detailed statistics pertaining to them. The app also allows the user to view present and past standings as well as statistics for current top goalies and skaters. Data is retrieved from the NHL API: https://github.com/Zmalski/NHL-API-Reference

The app supports user registration and saving past games into user's favorites.  

[Link to timekeeping](https://github.com/shakunage/fullstack-project/blob/dd7e816eb02db9aee471e541fa8d125a3d8903ef/docs/timekeeping.md)

## User manual 

The application is accessible at http://91.99.195.146/

The Home Page (or landing page) shows the most recent or upcoming NHL games, excluding pre-season games. The game cards are clickable, and show additional information about the game. 
n
For browsing future and all past games, click the Games text on the top bar, and select Browse Games. The calendar date selector lets you jump between dates, and the game cards are once again clickable 

The Standings page includes information about current standings by default, and the calendar date picker once again lets you see past standings. 

Behind the dropdown in the Players tab, the user can either click the text Skaters or Goalies, and browse information about the current stat leaders in these categories. 

In order to Sign up for the application, the user needs to provide a valid username, an email address that is in the format of an email address, and a password that is at least 8 characters long. Logged in users can save ended games into favorites using the star icon that appears on game cards for ended games after logging in. 

Favorited games are saved into a MongoDB database, so that they can be accessed quickly. The game is saved into the database if any user has ever saved it even once. 

## Technical Overview

- Frontend: React Router v7 framework mode, TypeScript
- Backend: Node.js (express), TypeScript
- Database (auth): PostgreSQL, communicating with the backend using Prisma ORM
- Database (favorited games): MongoDB, communicating with the backend using mongoose
- Caching: Redis (used to cache the list of favorite games)
- Proxy: nginx (also used for caching data fetched from the NHL API)
- Development and build environment: Docker using docker-compose

The frontend utilizes server-side rendering (SSR) for most pages, meaning that the frontend server first sends a HTML with no content, and later hydrates it with data that it fetched from the backend server. This reduces the number of network round trips that occur when the user loads a page in the browser. SSR also adds an extra layer of separation between the backend and the browser. 

Fetching additional data on pages is done by making a call to a "resource route" (Remix / React Router v7 concept). Resource routes are routes in the frontend application that return data (in our case JSON) instead of React components. For example, opening the Player Statistics dropdown on the page of an individual game, a call to a resource route (frontend server) is made from the browser. The frontend server then calls the NHL API to retrieve the data requested by the browser. The calls to the NHL API are proxied through the nginx server in order to enable caching. Conveniently, this setup also circumvents the CORS policy set in the NHL API. 

Diagram below is a rough representation of networking for the application. 

![Network Structure](docs/network_structure_updated.png)

Authentication utilizes server side session, so all auth tokens are saved in the backend PostgreSQL database, and the validity of the token is confirmed upon every privilege-requiring request. Only one valid token is allowed at a time, and tokens are limited to a 24-hour validity. 

Data fetching is managed using TanStack Query, and the library is also used to manage global state (login status) across components. Login and Signup forms are implemented using TanStack Form. 

The application also has formatting (prettier), and non-compliant code is automatically formatted by the pipeline, and a new commit is added by the workflow. Linting (eslint) and testing (vitest) pipelines are also included, and e2e tests (Playwright) are also implemented, although they are not included in the GH Actions pipeline to conserve runner execution time allowance. Testing coverage is about 85% for the backend, and around 45% for the frontend. 

## Development

Setting the following .envs with appropriate values is necessary in order to run the app:
```bash
# backend/.env
DATABASE_URL="postgresql://exampleuser:examplepassword@postgres:5432/exampledatabase"
MONGO_URL="mongodb://root:exampleuser@mongo:27017/gameDb?authSource=admin"
JWT_SECRET_KEY="examplekey"
```

```bash
# postgres/.env
POSTGRES_USER=exampleuser
POSTGRES_PASSWORD=examplepassword
POSTGRES_DB=exampledatabase
```

`docker compose -f docker-compose.dev.yml up --build` 
After the containers have been built, startup including container health checks should take around 15 to 30 seconds. 

The frontend will be accessible at `http://localhost:9998`.
MongoDB control panel (mongo-express) is accessible at `http://localhost:8081`.

### e2e testing

Currently, formatting, linting and unit testing are included in the GH actions pipeline, but e2e tests aren't so you need to run them manually with the following command while the development containers are running: `docker exec playwright npm run test:e2e`

## Build

```bash
docker compose -f docker-compose.prod.yml up --build
``` 
The app should should be available on `http://localhost:80`

## Deployment

Deploying the application containerized on a VPS, EC2 instance or similar is fairly straightforward.
Clone the repository on the server, switch to the production branch, replace the value of `CSR_BACKEND_URL` in the `docker-compose.depl.yml` with the domain or IP address of your server, and use `docker compose -f docker-compose.depl.yml up --build` to build and deploy the application. 

I personally have the application deployed on a Hetzner VPS (4 ARM vCPUs, 8GB RAM). This is probably more than what's sufficient though, since memory consumption hovers around 700-800M once the containers have been launched.
