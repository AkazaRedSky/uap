"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseAuth";

function Logout() {
   const router = useRouter();

   useEffect(() => {
      auth
         .signOut()
         .then(() => {
            console.log("Logged Out");
            router.push("/login");
         })
         .catch((error) => {
            console.error(error);
         });
   }),
      [];

   return <div>Logging out...</div>;
}

export default Logout;
