import React from "react";
import pic from "../assets/notfound.jpg";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <img
        src={pic}
        alt="Page not found"
        style={{ maxWidth: "100%", height: "auto" }}
        className="mb-4"
      />
    </div>
  );
};

export default PageNotFound;
