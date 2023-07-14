import React from "react";
import SearchBar from "../components/ui/dashboardSearchBar";
import Link from "next/link";

interface LinkType {
   href: string;
   name: string;
}

function Navigation() {
   const navLink: LinkType[] = [
      {
         href: "/dashboard/#featured",
         name: "Featured",
      },
      {
         href: "/dashboard/#offers",
         name: "Offers",
      },
      {
         href: "/dashboard/#populars",
         name: "Trending",
      },
   ];
   return (
      <div className="pt-5 relative">
         <div className="gradient mx-[2rem] bg-[#1b397e] pl-4 pr-2 flex items-center justify-between rounded-full  py-[0.3rem]  ">
            <ul className="flex items-center py-1.5 text-white text-[14px] gap-10">
               {navLink.map((link) => (
                  <li>
                     <Link href={link.href} scroll={false}>
                        {link.name}
                     </Link>
                  </li>
               ))}
            </ul>
            <SearchBar />
         </div>
      </div>
   );
}

export default Navigation;
