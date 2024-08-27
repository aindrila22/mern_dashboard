import BarChart from "./charts/barchart/BarChart";
import DonutChart from "./charts/DonutChart";
import React, { useEffect, useState, useRef } from "react";
import { backendUrl } from "../../utils/url";
import axios from "axios";
import TabularData from "./table/TabularData";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Home = () => {
  const [dataTables, setDataTables] = useState([[], [], [], [], []]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const barChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const tabDataRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const tableFields = [
        "country,end_year,impact",
        "insight,intensity,likelihood",
        "pestle,region,relevance",
        "sector,source,start_year",
        "title,topic,url",
      ];

      const tablePromises = tableFields.map((fields) =>
        axios.get(`${backendUrl}/api/data`, { params: { fields } })
      );

      const responses = await Promise.all(tablePromises);

      const newDataTables = responses.map((response) => response.data);
      setDataTables(newDataTables);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <div className="flex justify-start items-start w-full h-screen overflow-hidden">
      <Sidebar
        onScroll={handleScroll}
        refs={{ barChartRef, donutChartRef, tabDataRef }}
      />
      <div className="w-full h-full overflow-y-auto pb-10">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Data Visualization Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            A MERN Stack Project with Interactive Charts and Filters
          </p>
        </div>

        {loading && <p className="text-blue-500 text-center py-10">Loading data...</p>}
        {error && <p className="text-red-500 text-center py-10">{error}</p>}
        <div className="grid grid-cols-1 w-full max-w-7xl mx-auto gap-5 px-6">
          <div ref={barChartRef}>
            <BarChart />
          </div>
          <div ref={donutChartRef}>
            <DonutChart />
          </div>
        </div>

        {!loading && dataTables.length > 0 && (
          <div
            ref={tabDataRef}
            className="grid w-full max-w-7xl mx-auto gap-5 px-6"
          >
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
              <TabularData
                data={dataTables[0]}
                error={error}
                loading={loading}
                heading="Basic Information"
              />
              <TabularData
                data={dataTables[1]}
                error={error}
                loading={loading}
                heading="Insights and Intensity"
              />
              <TabularData
                data={dataTables[2]}
                error={error}
                loading={loading}
                heading="PEST and Regional Information"
              />
              <TabularData
                data={dataTables[3]}
                error={error}
                loading={loading}
                heading="Sector and Source"
              />
            </div>
            <div className="grid grid-cols-1 max-w-6xl mx-auto w-full gap-5">
              <TabularData
                data={dataTables[4]}
                error={error}
                loading={loading}
                heading="Title and Reference"
              />
            </div>
          </div>
        )}
      </div>

    </div>
      <Footer/>
      </>
  );
};

export default Home;