import { useState } from "react";
import PropTypes from "prop-types";

const Table = ({ data, itemsPerPage, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data) {
    return "No Data"
  }

  const totalPage = Math.ceil(data.length / itemsPerPage);

  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const getPaginationGroup = () => {
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 5, totalPage);
    return new Array(end - start + 1).fill().map((_, idx) => {
      if (totalPage > end && idx === 4) {
        return "...";
      }
      if (totalPage > end && idx === 5) {
        return totalPage;
      }
      return start + idx;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-3 text-left font-light text-gray-400"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getPaginatedData().map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index} className="py-4">
                  {column.display(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-10 bg-white border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-gray-400">
            Showing data {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {currentPage * itemsPerPage} of {data.length}
          </div>
          <div>
            <nav className="flex space-x-2">
              <button
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border border-gray-300 ${
                  currentPage === 1
                    ? "bg-gray-200 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-500 hover:text-white"
                }`}
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              >
                Prev
              </button>
              {getPaginationGroup().map((item, index) =>
                item === "..." ? (
                  <button key={index} disabled className="px-2 py-2">
                    ...
                  </button>
                ) : (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded border border-gray-300 hover:bg-indigo-500 hover:text-white ${
                      currentPage === item
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setCurrentPage(item)}
                  >
                    <span>{item}</span>
                  </button>
                )
              )}
              <button
                disabled={currentPage === totalPage}
                className={`px-4 py-2 rounded border border-gray-300  ${
                  currentPage === totalPage
                    ? "bg-gray-200 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-500 hover:text-white"
                }`}
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPage))
                }
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Table;
