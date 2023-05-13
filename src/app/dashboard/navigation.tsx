import React from "react";
import SearchBar from "./searchbar";
import Link from "next/link";

function Navigation() {
    return (
        <div className="pt-5 relative">
            <div className="gradient mx-[2rem] bg-[#1b397e] pl-4 pr-2 flex items-center justify-between rounded-full  py-[0.3rem]  ">
            <ul className="flex items-center py-1.5 text-white text-[14px] gap-10">
            <li>
            <Link
              href="/dashboard/#featured"
              scroll={false}
            >
              Featured
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/#offers"
              scroll={false}
            >
              Offers
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/#populars"
              scroll={false}
            >
              Populars
            </Link>
          </li>
            </ul>

            <SearchBar />
            </div>
        </div>
      );
    };

export default Navigation;