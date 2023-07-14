import Link from "next/link";
import Navbar from "./components/ui/navbar";

export default function Home() {
   return (
      <>
         <div>
            <Navbar />
         </div>
         <main className="flex flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm">
               <div className="p-2">
                  <h1 className="text-center text-white/75 text-[2rem]">
                     PROJECT UAP 1.2
                  </h1>
               </div>
               <div className="p-2">
                  <h1 className="text-center text-slate-300 text-[1rem]">
                     Game Purchase Application
                  </h1>
               </div>
               <div className="p-2 flex justify-center">
                  <Link
                     href="/dashboard"
                     className="mt-4 px-4 py-2 text-white/75 hover:text-slate-500 hover:bg-sky-300 bg-lime-600 text-[24px] rounded"
                  >
                     Start Here!
                  </Link>
               </div>
            </div>
            <div className="p-2 flex flex-grow justify-end">
               <Link
                  href="https://www.github.com/AkazaRedSky/uap"
                  className="text-white/75"
               >
                  View Changelog
               </Link>
            </div>
         </main>
      </>
   );
}
