import { useLoaderData, Link } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { FavoriteGame } from "~/components/GameCards/FavoriteGame";

export const clientLoader = favoritegamesLoader;

export default function FavoriteGames() {
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
          <Link
            to={getPageLink(currentPage - 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            preventScrollReset // Optional: prevent scroll to top on navigation
          >
            Previous
          </Link>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            to={getPageLink(page)}
            className={`px-4 py-2 border border-gray-300 rounded-md 
                        ${page === currentPage ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            preventScrollReset
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            to={getPageLink(currentPage + 1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            preventScrollReset
          >
            Next
          </Link>
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
