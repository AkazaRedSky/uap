import React from "react";
import Offer from "./offers";
import Recommended from "./recommended";
import Navigation from "./navigation";
import Trending from "./trending/trending";

function ApplicationDashboard() {
   return (
      <>
         <Navigation />
         <Recommended />
         <Offer />
         <Trending />
      </>
   );
}

export default ApplicationDashboard;
