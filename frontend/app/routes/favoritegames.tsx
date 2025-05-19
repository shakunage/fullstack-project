import { useLoaderData, useSearchParams } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { FavoriteGame } from "~/components/GameCards/FavoriteGame";

export const clientLoader = favoritegamesLoader;

export default function FavoriteGames() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") ?? "1"); // Default to page 1
  // const limit = parseInt(searchParams.get("limit") ?? "9"); // Default to limit 9
  const { games, currentPage, totalPages, totalGames } = useLoaderData<typeof clientLoader>();

  if (totalGames === 0) {
    return <div className="pt-16 text-center">No favorite games found.</div>;
  }

  if (!games || (games.length === 0 && totalGames > 0)) {
    return <div className="pt-16 text-center">Game details could not be fetched for this page.</div>;
  }

  const renderPaginationControls = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    // Helper to create Link URLs, preserving other search params
    const getPageLink = (pageNumber: number) => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("page", String(pageNumber));
      return `?${newSearchParams.toString()}`;
    };

    return (
      <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 my-8">
        {currentPage > 1 && (
          <button
            onClick={() => {setSearchParams({ page: (parseInt(searchParams.get("page") ?? "1") - 1).toString() })}}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Previous
          </button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {setSearchParams({ page: page.toString() })}}
            className={`px-4 py-2 border border-gray-300 rounded-md 
                        ${page === currentPage ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => {setSearchParams({page: (parseInt(searchParams.get("page") ?? "1") - 1).toString()})}}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Next
          </button>
        )}
      </nav>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6 text-center">My Favorite Games</h1>
      {renderPaginationControls()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {games.map((game) => (
          <FavoriteGame key={game.id} game={game} />
        ))}
      </div>
      {renderPaginationControls()}
      <p className="text-center my-4 text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalGames} total games)
      </p>
    </div>
  );
}
