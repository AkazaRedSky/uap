import Link from "next/link";
import React from "react";
import { buttonVariants } from "../buttoncomponent";
import Welcome from "./navbar/welcome";

export default function Navbar() {
   return (
      <>
         <nav>
            <div className="max-w-screen fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex item-center justify-between">
               <div className="container max-w-screen mx-auto w-full flex justify-between items-center">
                  <Link
                     href="/dashboard"
                     className={`h-10 py-2 px-4 bg-transparent text-slate-100 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors`}
                  >
                     UAP 1.2
                  </Link>
               </div>
               <div className="hidden md:flex gap-4 items-center">
                  <Link
                     href="/dashboard"
                     className={buttonVariants({ variant: "ghost" })}
                  >
                     Home
                  </Link>
               </div>
               <Welcome />
            </div>
         </nav>
      </>
   );
}
