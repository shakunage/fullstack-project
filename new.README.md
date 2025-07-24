# NHL Games Browser

Browse past and upcoming NHL games and detailed statistics pertaining to them. You can also view present and past standings as well as statistics for current top goalies and skaters. Data is retrieved from the NHL API: https://github.com/Zmalski/NHL-API-Reference

The app supports user registration and saving past games into user's favorites.  

## Tech stack

- Frontend: React Router v7 framework mode
- Backend: Node.js (express)
- Database (auth): PostgreSQL
- Database (favorited games): MongoDB (mongoose)
- Caching: Redis (used to cache the list of favorite games)
- Reverse Proxy: nginx (also used for caching data fetched from the NHL API)
- Development and build environment: Docker using docker-compose

The frontend utilizes server-side rendering (SSR) for most pages, meaning that the frontend server first sends a HTML with no content, and later hydrates it with data that it fetched from the backend server. This reduces the number of network round trips that occur when the user loads a page in the browser. SSR also adds an extra layer of separation between the backend and the browser. 

Data fetching is managed using TanStack Query, and the library is also used to manage global state (login status) across components. 

Diagram below a rough representation of networking of the application. 

![Network Structure](docs/network_structure.png)

## Development

`docker compose -f docker-compose.dev.yml up --build` 
After the containers have been built, startup including container health checks should take around 15 to 30 seconds. 

The frontend will be accessible at `http://localhost:9998`.
MongoDB control panel (mongo-express) is acccessible at `http://localhost:8081`.

Setting the following .envs is necessary in order to run the app:
```
# backend/.env
DATABASE_URL="postgresql://exampleuser:examplepassword@postgres:5432/exampledatabase"
MONGO_URL="mongodb://root:exampleuser@mongo:27017/gameDb?authSource=admin"
```

```
# postgres/.env
POSTGRES_USER=exampleuser
POSTGRES_PASSWORD=examplepassword
POSTGRES_DB=exampledatabase
```

### e2e testing

Currently, end-to-end test are not included in the GH actions pipeline, so you need to run them manually with the following command while the development containers are running: `docker exec playwright npm run test:e2e`

## Build

`docker compose -f docker-compose.prod.yml up --build` 
The app should should be available on `http://localhost:80`

## Deployment

Deploying the application containerized on a VPS, EC2 instance or similar while is fairly straightforward.
Clone the repository on the machine, replace the IP address in the `docker-compose.depl.yml` with the domain or IP address of your server, and use `docker compose -f docker-compose.depl.yml up --build` to build and deploy the application. 

## Timekeeping
