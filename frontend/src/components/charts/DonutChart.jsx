import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { backendUrl } from "../../../utils/url";


ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("top5");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/data?fields=topic`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const topicCounts = data.reduce((acc, item) => {
    const topic = item.topic || "Unknown";
    if (topic !== "Unknown") {
      acc[topic] = (acc[topic] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedTopics = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);

  const getFilteredTopics = (view) => {
    const limit =
      {
        top5: 5,
        top10: 10,
        top15: 15,
        top20: 20,
      }[view] || 5;
    return sortedTopics.slice(0, limit);
  };

  const filteredTopics = getFilteredTopics(view);

  const generateColors = (count) => {
    const colors = [];
    const baseColor =
      {
        top5: 200,
        top10: 120,
        top15: 340,
        top20: 600,
      }[view] || 200;

    for (let i = 0; i < count; i++) {
      const hue = (baseColor + (i * 360) / count) % 360;
      colors.push(`hsl(${hue}, 70%, 70%)`);
    }
    return colors;
  };

  const chartData = {
    labels: filteredTopics.map((item) => item.topic),
    datasets: [
      {
        label: "Number of Insights",
        data: filteredTopics.map((item) => item.count),
        backgroundColor: generateColors(filteredTopics.length),
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value} insights`;
          },
        },
      },
    },
  };

  return (
    <div className=" mx-auto w-full border border-gray-200 p-12 rounded-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Insights by Topic</h1>
        <p className="text-gray-600">
          Explore the top topics based on the number of insights available.
        </p>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-4/12 flex flex-col mb-5 md:mb-0">
            {["top5", "top10", "top15", "top20"].map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption)}
                className={`flex-1 p-3 mb-2 cursor-pointer border border-gray-300 rounded shadow ${
                  view === viewOption ? "bg-gray-200" : "bg-white"
                }`}
              >
                {`Top ${viewOption.replace("top", "")} Topics`}
              </button>
            ))}
          </div>
          <div className="w-full md:w-6/12">
            {filteredTopics.length > 0 ? (
              <Doughnut data={chartData} options={options} />
            ) : (
              <p>No data available for the selected view.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
