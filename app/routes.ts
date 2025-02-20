import { type RouteConfig, index, prefix } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("games", [
    index("routes/games.tsx", { id: 'routes/games-index' }),
    route(":date", "routes/games.tsx", { id: 'routes/games-bydate' }),
    route(":date/:game_id", "components/matchDayGame/endedGame.tsx", { id: 'routes/games-bydate-w-details' }),
  ]),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
