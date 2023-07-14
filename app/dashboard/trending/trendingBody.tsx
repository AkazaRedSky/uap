"use client";

import TrendingCard from "@/app/components/ui/trendingCard";
import { firestoredb } from "@/firebase/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface AppCardType {
   id: string;
   image: string;
   title: string;
   tags: { tag1: string; tag2: string; tag3: string; tag4: string };
   price: number;
   discountpercentage: number;
}

export default function TrendingBody() {
   const [applists, setAppLists] = useState<AppCardType[]>([]);
   useEffect(() => {
      (async () => {
         const appcolRef = collection(firestoredb, "applicationlist");
         const snapshots = await getDocs(appcolRef);
         const fetchedapps = snapshots.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
         });

         fetchedapps.forEach((app) => {
            const newCard = {
               id: app.id,
               image: app.applicationImage,
               title: app.applicationName,
               tags: {
                  tag1: app.tags.tag1,
                  tag2: app.tags.tag2,
                  tag3: app.tags.tag3,
                  tag4: app.tags.tag4,
               },
               price: app.applicationPrice,
               discountpercentage: 0,
            };
            setAppLists((prevState) => [...prevState, newCard]);
         });
      })();
   }, []);
   return (
      <>
         {applists.map((app) => (
            <TrendingCard
               key={app.id}
               id={app.id}
               image={app.image}
               title={app.title}
               tags={app.tags}
               price={app.price}
               discountpercentage={app.discountpercentage}
            />
         ))}
      </>
   );
}
