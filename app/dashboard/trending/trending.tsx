import React from "react";
import "./trending.css";
import TrendingHeader from "./trendingHeader";
import TrendingBody from "./trendingBody";

export default function Trending() {
   return (
      <div className="pt-5" id="populars">
         <div>
            <div
               className="pop-container tab_container"
               style={{ overflow: "visible" }}
            >
               <div className="">
                  <TrendingHeader />
                  <div className="home_tabs_content">
                     <h2
                        className="tab_content_title"
                        style={{ display: "none" }}
                     >
                        New &amp; Trending
                     </h2>
                     <div
                        className="tab_content"
                        id="tab_newreleases_content"
                        style={{ display: "block" }}
                     >
                        <TrendingBody />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
