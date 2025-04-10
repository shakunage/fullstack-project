import { type RouteConfig, index, prefix } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("games", [
    index("routes/games.tsx", { id: "routes/games-index" }),
    route(":date", "routes/games.tsx", { id: "routes/games-bydate" }),
    route(":date/:game_id", "components/GameCards/EndedGame.tsx", {
      id: "routes/games-bydate-w-details",
    }),
    route("/favoritegames", "routes/favoritegames.tsx"),
  ]),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
] satisfies RouteConfig;
