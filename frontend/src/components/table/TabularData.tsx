import React from "react";
import Columns from "./Columns";

const TabularData = ({ data, heading, loading }) => {
  return (
    <div className="border border-gray-200 mt-20 p-4 rounded-lg shadow-md bg-white">
      <div className="mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
          <p className="text-gray-500">(Tabular Data)</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Columns data={data} />
        </div>
      )}
    </div>
  );
};

export default TabularData;
