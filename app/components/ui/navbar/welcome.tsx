"use client";

import { useState, useEffect, Fragment } from "react";
import { getCookie, removeCookie } from "typescript-cookie";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoredb, auth } from "@/firebase/firebaseconfig";
import { User, signOut } from "firebase/auth";
import Image from "next/image";
import TempIMG from "public/assets/images/temp.jpg";
import { buttonVariants } from "../../buttoncomponent";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

function Welcome() {
   const [user, setUser] = useState<User | null>(null);
   const [name, setName] = useState<string>("");
   const [userImage, setUserImage] = useState<string>("");
   const [userBalance, setUserBalance] = useState<string>("");

   useEffect(() => {
      const getUsername = async () => {
         const username = getCookie("username");
         if (username) {
            const userRef = collection(firestoredb, "userdata");
            const q = query(userRef, where("username", "==", username));
            const userSnapshot = await getDocs(q);
            const userDoc = userSnapshot.docs[0];
            if (userDoc.exists()) {
               setUser(userDoc.data() as User);
               setName(userDoc.get("userRealName"));
               setUserImage(userDoc.get("userImage"));
               setUserBalance(userDoc.get("userBalance"));
            }
         }
      };
      getUsername();
   }, [user]);

   const handleLogOut = async () => {
      try {
         await signOut(auth);
         removeCookie("username");
         console.log("Logout successful!");
      } catch (error) {
         console.error("Error logging out:", error);
      }
   };

   return (
      <>
         {user ? (
            <>
               <div className="hidden md:flex gap-4 items-center whitespace-nowrap">
                  <Link
                     href="/payment/topup"
                     className={buttonVariants({ variant: "ghost" })}
                  >
                     Top Up
                  </Link>
               </div>
               <Menu as="div" className="md:flex gap-4 items-center mr-5">
                  <div>
                     <Menu.Button className="flex text-sm">
                        <Image
                           className="h-8 w-8 rounded-full"
                           src={userImage ? userImage : TempIMG}
                           alt=""
                           width={32}
                           height={32}
                        />
                     </Menu.Button>
                  </div>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95"
                  >
                     <Menu.Items className="absolute origin-top-right top-12 right-0 z-10 mt-2 w-48 rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                           <p className="select-none text-center block px-4 py-2 text-md text-white/75 w-full">
                              Welcome {name}
                           </p>
                        </Menu.Item>
                        <Menu.Item>
                           <Link
                              href="#"
                              className="text-center block px-4 py-2 text-sm text-white/75 w-full"
                           >
                              Rp. {userBalance.toLocaleString()}
                           </Link>
                        </Menu.Item>
                        <Menu.Item>
                           <Link
                              href="#"
                              className={`text-left hover:bg-slate-400 block px-4 py-2 text-sm text-white/75 hover:text-black w-full`}
                              prefetch={false}
                           >
                              Profile
                           </Link>
                        </Menu.Item>
                        <Menu.Item>
                           <Link
                              href="#"
                              className={`text-left hover:bg-slate-400 block px-4 py-2 text-sm text-white/75 hover:text-black w-full`}
                              prefetch={false}
                           >
                              Settings
                           </Link>
                        </Menu.Item>
                        <Menu.Item>
                           <button
                              onClick={handleLogOut}
                              className={`text-left hover:bg-slate-400 block px-4 py-2 text-sm text-white/75 hover:text-black w-full`}
                           >
                              Sign out
                           </button>
                        </Menu.Item>
                     </Menu.Items>
                  </Transition>
               </Menu>
            </>
         ) : (
            <>
               <div className="hidden md:flex gap-4 items-center whitespace-nowrap">
                  <Link
                     href="/register"
                     className={buttonVariants({ variant: "ghost" })}
                  >
                     Create New Account
                  </Link>
               </div>
               <div className="hidden md:flex gap-4 items-center">
                  <Link
                     href="/login"
                     className={buttonVariants({ variant: "ghost" })}
                  >
                     Login
                  </Link>
               </div>
            </>
         )}
      </>
   );
}

export default Welcome;
