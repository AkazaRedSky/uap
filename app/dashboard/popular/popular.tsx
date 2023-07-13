'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './popular.css';
import PopularCard from './popularcard';
import PopularHeader from './popularheader';
import { collection, getDocs } from 'firebase/firestore';
import { firestoredb } from '@/firebase/firebaseconfig';

interface AppCardType {
    id: string;
    image: string;
    title: string;
    tags: {tag1: string, tag2: string, tag3: string, tag4: string},
    price: number,
    discountpercentage: number,
    };

//Temporary name
function Popular() {
    const [applists, setAppLists] = useState<AppCardType[]>([]);

      //Get data from Firestore
        useEffect(() => {
            (async () => {
            const appcolRef = collection(firestoredb, 'applicationlist');
            const snapshots = await getDocs(appcolRef)
            const fetchedapps = snapshots.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                return data
            })

            fetchedapps.forEach((app) => {
                const newCard = {
                id: app.id,
                image: app.applicationImage,
                title: app.applicationName,
                tags: {tag1: app.tags.tag1, tag2: app.tags.tag2, tag3: app.tags.tag3, tag4: app.tags.tag4},
                price: app.applicationPrice,
                discountpercentage: 0,
                };
                setAppLists(prevState => [...prevState, newCard]);
            });
            })()
        }, [!applists])

  return (
    <div className="pt-5" id='populars'>
        <div>
            <div className="pop-container tab_container" style={{ overflow: "visible" }}>
                <div className="">
                    <PopularHeader/>
                    <div className="home_tabs_content">
                    <h2 className="tab_content_title" style={{ display: "none" }}>
                        New &amp; Trending
                    </h2>
                    <div
                        className="tab_content"
                        id="tab_newreleases_content"
                        style={{ display: "block" }}
                    >
                        {applists.map((app) => (
                        <PopularCard key={app.id} id={app.id} image={app.image} title={app.title} tags={app.tags} price={app.price} discountpercentage={app.discountpercentage} />
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Popular;