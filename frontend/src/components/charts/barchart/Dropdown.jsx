import React from "react";

const Dropdown = ({
  selectedYear,
  validYears,
  showOptions,
  handleYearChange,
  toggleDropdown,
}) => {
  return (
    <div className="mx-auto mb-5 relative justify-end">
      <div
        onClick={toggleDropdown}
        className="border w-60 border-gray-200 flex items-center justify-between p-4 rounded-md  cursor-pointer"
      >
        <span>{selectedYear}</span>
        <span
          className={`${
            showOptions
              ? " rotate-180 transform duration-300 float-right"
              : "rotate-0 transform duration-300"
          }`}
        >
          ▼
        </span>
      </div>
      <div
        className={` ${showOptions ? "show w-60" : ""}`}
        style={{
          position: "absolute",
          top: "100%",
          left: "0",
          marginTop: "10px",
          maxHeight: "150px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "white",
          zIndex: 1000,
          display: showOptions ? "block" : "none",
        }}
      >
        {validYears.map((year) => (
          <div
            key={year}
            style={{ padding: "8px", cursor: "pointer" }}
            onClick={() => handleYearChange(year)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
