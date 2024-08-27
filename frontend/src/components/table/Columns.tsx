import React, { useState } from "react";
import Button from "./Button";

const Columns = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const rowsPerPage = 10;

  const headers = Object.keys(data[0] || {}).filter(
    (header) => header !== "_id"
  );

  const filteredData = data.filter((row) => {
    return headers.every((header) => {
      if (!filters[header]) return true;
      return String(row[header])
        .toLowerCase()
        .includes(filters[header].toLowerCase());
    });
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleFilterChange = (header, value) => {
    setFilters({ ...filters, [header]: value });
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Button
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalColumns={headers.length}
      />
      <div className="overflow-x-auto w-full custom-scrollbar my-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200"
                  key={header}
                >
                  <div className="flex flex-col">
                    <span>{header}</span>
                    <input
                      type="text"
                      placeholder={`Filter ${header}`}
                      className="mt-1 p-1 border border-gray-300 rounded-md"
                      value={filters[header] || ""}
                      onChange={(e) =>
                        handleFilterChange(header, e.target.value)
                      }
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, idx) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td
                    className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200"
                    key={header}
                  >
                    {row[header] === null ? "No Data" : row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalColumns={headers.length}
      />
    </div>
  );
};

export default Columns;
