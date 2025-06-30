# Timekeeping

| Date| Details | Hours |
| ----------- | ------------------------------------------------------------------------------------------------------------------- | ----- |
| 9 Feb 2025| Setting up a new React Router project with ESLint, TailwindCSS and Docker | 4 |
| 11 Feb 2025 | Adding some routes and organizing the app & deps, familiarizing myself with React Router v7 | 1.5 |
| 15 Feb 2025 | Setting up SSR data fetching functionality using the NHL API, defining types for the returned data| 4.5 |
| 16 Feb 2025 | Improving UI styling, expanding data handling capabilities, adopting the use of a code formatter | 2.5 |
| 18 Feb 2025 | Overhauling route config, updating the UI (calendar component for selecting a date), adding the shadcn ui library | 2 |
| 19 Feb 2025 | Refactoring utilities, implementing handling of live games, improving the handling of time zones| 1.5 |
| 20 Feb 2025 | Expanding data loading capabilities, implementing the ability to show details for ended game cards (buggy)| 2.5 |
| 24 Feb 2025 | Refactoring and fixing Typescript typing for objects and methods| 3 |
| 1 Mar 2025| Configuring & debugging a nginx reverse proxy setup for development, fix hydration errors in rendering| 5 |
| 2 Mar 2025| Major refactoring of the project, fixing date-related bugs| 3.5 |
| 3 Mar 2025| Enriching LiveGame component, attmepting solve prop drilling issues, eliminating duplicate code thru refactoring| 2 |
| 6 Mar 2025| Adding Postgres & Prisma ORM to the project, creating a simple User model | 2 |
| 8 Mar 2025| Configuring docker compose setup for Prisma, creating schemas | 3 |
| 11 Mar 2025 | Tinkering with backend configurations (failing to run Prisma from frontend -> creating a separate express backend)| 3 |
| 13 Mar 2025 | Major refactoring of the project, setting up backend in the Docker compose setup, shaping up basic API architecture | 4 |
| 14 Mar 2025 | Implementing backend functionality (signup, login) | 2 |
| 15 Mar 2025 | Finishing touches (backend) on login, logout, signup, token-based session handling| 4 |
| 16 Mar 2025 | Reconsidering backend auth logic, refactoring backend code | 3.5 |
| 19 Mar 2025 | Backend fixes, frontend login functionality | 3.5 |
| 24 Mar 2025 | Implementing cookies-based auth, adopting the use of React Query for auth check functionality | 3.5 |
| 26 Mar 2025 | Rudimentary introduction of TanStack Form | 1 |
| 27 Mar 2025 | Implement favoriting games, add spinner to game details button | 2 |
| 28 Mar 2025 | Improving the game favoriting feature | 2 |
| 2 Apr 2025 | Add endpoint to check game favorite status, fix auth check functionality, improve login & signup form look and feel | 2.5 |
| 4 Apr 2025 | Attempting implementation of Redux Toolkit for storing login state | 1.5 |
| 6 Apr 2025 | Proper implementation of Redux Toolkit for login state, improve Games page by adding navigation UI elements and React Query state management, add proper handling of expired cookies, remove unneeded code, favorite list endpoint | 4.5 |
| 10 Apr 2025 | Add favorites page functionality for backend and frontend, UI brush up, some refactoring (wip) | 2 |
| 11 Apr 2025 | Major refactoring of the app: move data loading into service layer, QoL improvements | 4 |
| 12 Apr 2025 | Further refactoring and separating layers | 2 |
| 15 Apr 2025 | Bug fixing, state management improvements, miscallenous code improvements | 1.5 |
| 22 Apr 2025 | Improving Docker setup, further refactoring of the service layer (data fetching and loaders) | 1 |
| 24 Apr 2025 | Tidying up the API call logic in the forms (login, signup)  | 1 |
| 27 Apr 2025 | Expanding functionality, adding top teams and top skaters views  | 3.5 |
| 28 Apr 2025 | Expanding functionality: adding the view for betting lines, separating players' stats into skaters and goalies, implementing a footer  | 2.5 |
| 3 May 2025 | Further expanding of functionality including data loading, improving the look and feel of routes, fixing Top Bar UI bugs  | 3.5 |
| 10 May 2025 | Major overhaul of the Favorite Games view and backend functionality | 4.5 |
| 11 May 2025 | Making game cards clickable, adding a dedicated page for a single game, refactoring of components failed attempet to implement date view for betting lines | 3 |
| 16 May 2025 | Improve database query logic for favorite games  | 0.5 |
| 17 May 2025 | Initial implementation for pagination in the Favorite Games page  | 2.5 |
| 19 May 2025 | Fix implementation of pagination | 1.5 |
| 20 May 2025 | Add an "items per page" menu to the favorite games navigation and improve UI (loading animation) | 2 |
| 21 May 2025 | Fix backend-postgres healthcheck, UI overhaul during loading animation for the Games page | 1 |
| 22 May 2025 | Fix DB side sorting for favorite games, move fetching of favorite games to server side | 1.5 |
| 23 May 2025 | Significant refactoring of the favorite list fetching/loading logic | 1 |
| 25 May 2025 | Add a new skeleton route for individual games | 0.5 |
| 26 May 2025 | Implement a simple view for individual games | 1 |
| 29 May 2025 | Add a new loader & service for external data, start refactoring the data loading functions, brush up the individual game view | 2 |
| 30 May 2025 | Complete (apart from FavoriteService) refactoring of data fetching functions & migration from axios to fetch | 4 |
| 2 Jun 2025 | Migrate FavoriteService from axios to fetch & utilize a generic function to generate the requests, enrich individual game page & make use of SSR loading and CSR fetching properly | 3 |
| 3 Jun 2025 | Refactoring the individual game page | 2 |
| 4 Jun 2025 | Fix auth check service return value upon failed authentication, further bug fixing & refactoring in the individual game page | 1.5 |
| 12 Jun 2025 | Add nginx-side caching to the external API and test the config to see the caching actually works, more refactoring of the individual game, make the penalties summary for individual game sensible  | 3 |
| 13 Jun 2025 | Add redis caching for user's favorite games list, change pagination (skip and limit) implementation to suit redis caching better, add redis healthcheck and cache invalidation | 3 |
| 14 Jun 2025 | Enhance nginx logging options to better verify cache hits/misses, enhance handling of multiple OT periods in the UI, further refactoring of the individual game page | 3.5 |
| 15 Jun 2025 | Slight fix to docker compose setup, expand data fetching capabilities, introduce the concept of resource routes to the app and utilize them | 4.5 |
| 16 Jun 2025 | Overhaul data fetching logic behind gamedetailsbutton, make the button visible on favorite game cards. On the individual game page, add more info into the the teamstats component, and make three stars into a dropdown and move it down the order | 2 |
| 17 Jun 2025 | Further brushing up of the invidual game component, unify layout of /games and /favoritegames, add mongodb & mongodb express monitoring services to the docker compose setup, rudimentary implementation of mongodb to the backend | 2 |
| 19 Jun 2025 | Update mongo config, improve docker compose setup wrt mongo and mongo-express, start overhauling game favoriting logic | 1.5 |
| 20 Jun 2025 | Start reorganizing the backend and separating the functions of MongoDB and Postgres databases, implement backend logic to interact with the MongoDB database | 2.5 |
| 21 Jun 2025 | Continuing to revamp the backend logic | 1.5 |
| 22 Jun 2025 | Adapt frontend & backend code handle the use of MongoDB for favorite games data, reimplement Redis caching in wrt user's favorite list | 3.5 |
| 23 Jun 2025 | Bugfixing, refactoring, big overhaul of entities in the front end | 2.5 |
| 24 Jun 2025 | Refactor schemas and interfaces (now called data transfer objects), strenghten mongoose schema validations for GameSchema | 1.5 |
| 25 Jun 2025 | Improve logic for fetching games for the top page, remove betting lines functionality, clean up the favoritegames route, add new feature: skip to previous match day if selected day has no games | 4 |
| 26 Jun 2025 | Improve the look and feel of the Skip to previous match day button, remove unnecessary resource route & add "Skip to next match day" feature | 1.5 |
| 27 Jun 2025 | Fix loader filename extensions, brush up data fetching for game days, various bug fixes wrt games page and individual game page | 1 |
| 28 Jun 2025 | Rename Teams page to Standings, add datepicker into the /standings page, refactor the datepicker component and utilize it in /games too, simply loader usage for /home and /games routes, improve DatePicker state handling when skipping to latest standings info, migrate from moment.js to Day.js | 3.5 |
| 29 Jun 2025 | Replace redux toolkit with TanStack Query for managing auth state across components, refactor useQuery hooks into separate files in the hooks folder | 2 |
| 30 Jul 2025 | Refactor route components into subcomponents | 1 |