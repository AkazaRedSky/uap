'use client'

import React, { useEffect, useState } from "react";
import OfferCard from "./offercard";
import TempIMG from "public/assets/images/detroit.jpg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoredb } from '../../../firebase/firestore';

interface CardType { 
  id: string;
  event: string;
  wallpaper: string;
  title: string;
  enddate: string;
  endtime: string;
  discountpercentage: number;
  originalprice: number;
  discountedprice: number 
}

function Offer() {
  const [cardlists, setCardLists] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  //Get data from Firestore
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const appcolRef = collection(firestoredb, "applicationlist");
      const queryRef = query(appcolRef, where("currentEvent", "!=", ""));

      const snapshots = await getDocs(queryRef);
      const fetchedapps = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });

      const limitedApps = fetchedapps.slice(0, 9);

      const newCards = limitedApps.map((app) => ({
        id: app.id,
        event: app.currentEvent,
        wallpaper: app.applicationImage,
        title: app.applicationName,
        enddate: "9th May",
        endtime: "12 AM",
        discountpercentage: app.eventDiscount,
        originalprice: app.applicationPrice,
        discountedprice: ((100 - 50) / 100) * app.applicationPrice,
      }));
      setCardLists(newCards);
    };
    fetchCards();
    setLoading(false);
  }, [cardlists]);
  
  return (
    <div className="mx-[2rem] " id="offers">
      <p className="text-white pt-6">SPECIAL OFFERS</p>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-slate-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3">
          {cardlists.map((card) => (
            <OfferCard
            key={card.id}
            id={card.id}
            event={card.event} 
            wallpaper={card.wallpaper} 
            title={card.title} 
            enddate={card.enddate} 
            endtime={card.endtime} 
            discountpercentage={card.discountpercentage} 
            originalprice={card.originalprice} 
            discountedprice={card.discountedprice} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Offer;