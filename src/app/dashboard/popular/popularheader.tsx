'use client'

import React, { useState } from 'react';
import './popular.css';

function PopularHeader() {
    const [ActiveTab, setActiveTab] = useState<string>("trending");
  
    const handleTabClick = (tabId: string) => {
      setActiveTab(tabId);
    };
  
    return (
      <div className="home_tabs_row_ctn justify-center">
        <div style={{ height: 31 }}>
          <div className="home_tabs_row">
            <div id="trending" className={`home_tab ${ActiveTab === 'trending' ? 'active' : ''}`} onClick={() => handleTabClick('trending')}>
              <div className="tab_content">New &amp; Trending</div>
            </div>
            <div id="top_sellers" className={`home_tab ${ActiveTab === 'top_sellers' ? 'active' : ''}`} onClick={() => handleTabClick('top_sellers')}>
              <div className="tab_content">Top Sellers</div>
            </div>
            <div id="popular_upcoming" className={`home_tab ${ActiveTab === 'popular_upcoming' ? 'active' : ''}`} onClick={() => handleTabClick('popular_upcoming')}>
              <div className="tab_content">Popular Upcoming</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default PopularHeader