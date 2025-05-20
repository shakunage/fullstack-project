import { useLoaderData, useSearchParams, useNavigation } from "react-router";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
import { FavoriteGame } from "~/components/GameCards/FavoriteGame";

export const clientLoader = favoritegamesLoader;

export default function FavoriteGames() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { games, currentPage, totalPages, totalGames } = useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const pageCountOptions = ["9", "18", "27"]

  console.log("Current limit:", searchParams.get("limit"));
  console.log("Current page:", searchParams.get("page"));

  if (totalGames === 0) {
    return <div className="pt-16 text-center">No favorite games found.</div>;
  }

  if (!games || (games.length === 0 && totalGames > 0)) {
    return <div className="pt-16 text-center">Game details could not be fetched for this page.</div>;
  }

  const renderPaginationControls = () => {

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="relative my-8 px-4 sm:px-6 lg:px-8"> {/* Relative parent, with horizontal padding */}
        <nav aria-label="Pagination" className="flex justify-center items-center space-x-2">
          {/* Page navigation buttons remain centered */}
          {currentPage > 1 && (
            <button
              onClick={() => { setSearchParams(
                { 
                  page: (parseInt(searchParams.get("page") ?? "1") - 1).toString(),
                  limit: searchParams.get("limit") ?? "9"
                 },
                { preventScrollReset: true }
              );
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Previous
            </button>
          )}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => { setSearchParams({ page: page.toString(), limit: searchParams.get("limit") ?? "9" }, { preventScrollReset: true }); }}
              className={`px-4 py-2 border border-gray-300 rounded-md ${
                page === currentPage ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => { setSearchParams({ page: (parseInt(searchParams.get("page") ?? "1") + 1).toString(), limit: searchParams.get("limit") ?? "9" }, { preventScrollReset: true }); }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Next
            </button>
          )}
        </nav>
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2">
          {/* Positioned to the far right and vertically centered */}
          <div className="ml-4 flex items-center"> {/* Tailwind for margin and alignment */}
      <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700">Items per page:</label>
      <select
        id="itemsPerPage"
        value={searchParams.get("limit") ?? 1}
        onChange={(e) => {setSearchParams({ limit: e.target.value, page: searchParams.get("page")?.toString() ?? "1" }, { preventScrollReset: true })}}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {pageCountOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-6 text-center">My Favorite Games</h1>
      {renderPaginationControls()}
      {navigation.state === "loading" ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {games.map((game) => (
          <FavoriteGame key={game.id} game={game} />
        ))}
      </div>
      )}
      {renderPaginationControls()}
      <p className="text-center my-4 text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({totalGames} total games)
      </p>
    </div>
  );
}
