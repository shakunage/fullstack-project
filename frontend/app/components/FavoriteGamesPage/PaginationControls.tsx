import { useSearchParams } from "react-router";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = ["9", "18", "27"];

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, "…", totalPages);
      } else if (currentPage > totalPages - 2) {
        pageNumbers.push(
          1,
          "…",
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages);
      }
    }
    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <div className="relative my-8 px-3 sm:px-6 lg:px-8">
      {" "}
      {/* Relative parent, with horizontal padding */}
      <nav aria-label="Pagination" className="flex justify-center items-center space-x-2">
        {/* Page navigation buttons remain centered */}
        {currentPage > 1 && (
          <button
            onClick={() => {
              setSearchParams(
                {
                  page: (parseInt(searchParams.get("page") ?? "1") - 1).toString(),
                  limit: searchParams.get("limit") ?? "9",
                },
                { preventScrollReset: true }
              );
            }}
            className="px-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {"<"}
          </button>
        )}
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => {
                setSearchParams(
                  { page: page.toString(), limit: searchParams.get("limit") ?? "9" },
                  { preventScrollReset: true }
                );
              }}
              className={`px-3 py-2 border border-gray-300 rounded-md ${
                page === currentPage ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={`dots-${index}`} className="py-2 text-gray-500">
              {" "}
            </span>
          )
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => {
              setSearchParams(
                {
                  page: (parseInt(searchParams.get("page") ?? "1") + 1).toString(),
                  limit: searchParams.get("limit") ?? "9",
                },
                { preventScrollReset: true }
              );
            }}
            className="px-2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {">"}
          </button>
        )}
      </nav>
      <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2">
        {/* Positioned to the far right and vertically centered */}
        <div className="ml-4 flex flex-col items-center">
          {/* Tailwind for margin and alignment */}
          <label htmlFor="itemsPerPage" className="text-sm text-gray-700 mb-1">
            Show
          </label>
          <select
            id="itemsPerPage"
            value={searchParams.get("limit") ?? "9"}
            onChange={(e) => {
              setSearchParams({ limit: e.target.value, page: "1" }, { preventScrollReset: true });
            }}
            className="px-1 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {itemsPerPage.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
