import type { Route } from "./+types/home";
import { TopBar } from "../components/topBar";
import { Welcome } from "../components/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <TopBar />
      <Welcome />
    </>
  );
}
