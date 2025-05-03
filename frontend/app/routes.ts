import { type RouteConfig, index, prefix } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  // home
  index("routes/home.tsx"),
  // top bar
  ...prefix("games", [
    index("routes/games.tsx", { id: "routes/games-index" }),
    route(":date", "routes/games.tsx", { id: "routes/games-bydate" }),
    route(":date/:game_id", "components/GameCards/EndedGame.tsx", {
      id: "routes/games-bydate-w-details",
    }),
    route("/favoritegames", "routes/favoritegames.tsx"),
  ]),
  ...prefix("teams", [
    index("routes/teams.tsx", { id: "routes/teams-index" }),
    route(":date", "routes/teams.tsx", { id: "routes/teams-bydate" }),
  ]),
  ...prefix("players", [
    index("routes/players.tsx", { id: "routes/players-index" }),
    route("skaters", "routes/players.tsx", { id: "routes/skaters" }),
    route("goalies", "routes/goalies.tsx", {
      id: "routes/goalies",
    }),
  ]),
  route("bettinglines", "routes/bettinglines.tsx"),
  // login and signup
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  // footer
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
