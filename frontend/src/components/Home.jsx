import React, { useEffect, useState } from "react";
import { backendUrl } from "../../utils/url";
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${backendUrl}/api/data`, { params: filters });
      setData(response.data);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
console.log(data)
  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Data Visualization Dashboard</h1>

      <div>
        {["end_year", "topic", "sector", "region", "pestle", "source", "swot", "country", "city"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={filters[field] || ""}
            onChange={handleFilterChange}
            style={{ margin: "5px", padding: "8px" }}
          />
        ))}
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add components to render `data` here */}
    </>
  );
};

export default Home;
