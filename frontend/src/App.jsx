import React from "react";
import PageNotFound from "./components/PageNotFound";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));

function App() {
  return (
    <>
      <React.Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
