import React, { useState, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dropdown from "./Dropdown";
import ChartContainer from "./ChartContainer";
import { backendUrl } from "../../../../utils/url";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/data?fields=country,end_year,intensity`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  const uniqueCountries = useMemo(() => {
    return Array.from(
      new Set(data.map((item) => item.country).filter(Boolean))
    );
  }, [data]);

  const validYears = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.end_year)))
      .filter(
        (year) =>
          year &&
          year <= 2040 &&
          data.some((item) => item.end_year === year && item.intensity > 0)
      )
      .sort((a, b) => b - a);
  }, [data]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setShowOptions(false);
  };

  const toggleDropdown = () => {
    setShowOptions((prev) => !prev);
  };

  const chartData = useMemo(() => {
    return {
      labels: uniqueCountries,
      datasets: validYears.map((year) => ({
        label: `Year ${year}`,
        data: uniqueCountries.map((country) => {
          const item = data.find(
            (d) => d.country === country && d.end_year === year
          );
          return item && item.intensity ? item.intensity : 0;
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 0.5,
        barThickness: 50,
      })),
    };
  }, [uniqueCountries, validYears, data]);

  const filteredData = useMemo(() => {
    return {
      labels: uniqueCountries,
      datasets: chartData.datasets.filter(
        (dataset) => dataset.label === `Year ${selectedYear}`
      ),
    };
  }, [chartData, uniqueCountries, selectedYear]);

  const options = useMemo(() => {
    return {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Country",
          },
        },
        y: {
          title: {
            display: true,
            text: "Intensity",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    };
  }, []);

  return (
    <div className="w-full border border-gray-300 rounded p-12">
      <h2 className="text-xl font-bold mb-2">Intensity of Topics Across Countries</h2>
      <p className="text-gray-600 mb-6">This chart displays the intensity of various topics across different countries for the selected year.</p>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && data.length > 0 && (
        <div className="w-full">
          <Dropdown
            selectedYear={selectedYear}
            validYears={validYears}
            showOptions={showOptions}
            handleYearChange={handleYearChange}
            toggleDropdown={toggleDropdown}
          />
          <ChartContainer data={filteredData} options={options} />
        </div>
      )}
    </div>
  );
};

export default BarChart;