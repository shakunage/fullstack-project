import { useLoaderData } from "react-router";
import { topskatersLoader } from "../loaders/topskatersLoader";
import { type TopSkaters } from "../entities/TopSkaters";

export const loader = topskatersLoader;

export default function Players() {
  const data: TopSkaters = useLoaderData<typeof loader>();

  if (!data) {
    return <div>Error loading players</div>;
  }

  // Inline formatting logic since helper functions outside return are disallowed
  const formatCategoryNameInline = (category: string): string => {
    switch (category) {
      case "goalsSh":
        return "Short Handed Goals";
      case "plusMinus":
        return "Plus/Minus";
      case "assists":
        return "Assists";
      case "goalsPp":
        return "Power Play Goals";
      case "faceoffLeaders":
        return "Faceoff %";
      case "penaltyMins":
        return "Penalty Minutes";
      case "goals":
        return "Goals";
      case "points":
        return "Points";
      case "toi":
        return "Time On Ice";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const formatStatValueInline = (category: string, value: number | string): string => {
    if (category === "faceoffLeaders" && typeof value === "number")
      return `${(value * 100).toFixed(1)}%`;
    if (category === "toi" && typeof value === "number") {
      const totalSeconds = Math.floor(value); // Ensure we start with whole seconds
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60; // This will now be an integer
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return String(value);
  };

  // Filter out empty categories inline
  const validCategories = Object.entries(data).filter(([, skaters]) => skaters && skaters.length > 0);

  return (
    <main className="container mx-auto px-4 py-20">
      {" "}
      {/* Adjusted padding top */}
      <h1 className="text-3xl font-bold text-center mb-8">Top Skaters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validCategories.map(([category, skaters]) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <h2 className="text-xl font-semibold p-4 bg-gray-100 border-b border-gray-200 text-center">
              {formatCategoryNameInline(category)}
            </h2>
            <ul className="divide-y divide-gray-200">
              {skaters.map((skater, index) => (
                <li key={skater.id} className="p-3 flex items-center space-x-3 hover:bg-gray-50">
                  <span className="font-semibold text-gray-500 w-6 text-right">{index + 1}.</span>
                  <img
                    src={skater.headshot}
                    alt={`${skater.firstName.default} ${skater.lastName.default}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    onError={(e) => (e.currentTarget.src = "/placeholder-player.png")} // Placeholder image path
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {skater.firstName.default} {skater.lastName.default} ({skater.position})
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <img
                        src={skater.teamLogo}
                        alt={skater.teamName.default}
                        className="w-4 h-4 mr-1"
                        onError={(e) => (e.currentTarget.style.display = "none")} // Hide if logo fails
                      />
                      <span>{skater.teamAbbrev}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {formatStatValueInline(category, skater.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
