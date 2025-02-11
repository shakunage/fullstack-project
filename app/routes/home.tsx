import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
  <main className="flex items-center justify-center pt-16 pb-4">
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      Today's Matches:
      <p></p>
      <ul>
        <li>- Match (fetched from NHL API)</li>
        <li>- Match (fetched from NHL API)</li>
        <li>- Match (fetched from NHL API)</li>
      </ul>
    </div>
  </main>
  )
}
