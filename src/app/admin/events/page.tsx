'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { firestoredb } from '../../../../firebase/firestore';

interface EventType {
        id: string;
        eventName: string;
        eventDate: {
            eventStartDate: Timestamp;
            eventEndDate: Timestamp;
            eventDuration: number;
        };
        eventDiscount: number;
}

function AdminEvent() {

    const [eventLists, setEventLists] = useState<EventType[]>([]);

    useEffect(() => {
        setEventLists([]);
        (async () => {
          const eventcolRef = collection(firestoredb, 'specialevent');
          const snapshots = await getDocs(eventcolRef)
          const fetchedevents = snapshots.docs.map((doc) => {
            const data = doc.data()
            data.id = doc.id
            return data
          })
          fetchedevents.forEach((event) => {
            const newEvent:EventType = {
              id: event.id,
              eventName: event.eventName,
              eventDate: {
                eventStartDate: event.eventDate.eventStartDate,
                eventEndDate: event.eventDate.eventEndDate,
                eventDuration: event.eventDate.eventDuration
              },
              eventDiscount: event.eventDiscount,
            };
            setEventLists(prevState => [...prevState, newEvent]);           
        });
        })()
      }, [])


  return (
    <>
    <div className='item-center p-4'>
        <h2 className='text-center dark:text-white text-slate-600 text-[28px] mb-8'>Products</h2>
        <table className='border-collapse table-auto w-full'>
            <thead className='text-center border-b-2 dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200'>
                <tr>
                    <th>No</th>
                    <th>Event ID</th>
                    <th>Event Name</th>
                    <th>Event Start Date</th>
                    <th>Event End Date</th>
                    <th>Event Duration</th>
                    <th>Event Discount</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody className='text-center bg-white dark:bg-slate-800'>
            {eventLists.map((event, index) => (
                <tr className='h-[160px] border-b border-slate-600' key={event.id}>
                    <td>{index+1}</td>
                    <td>{event.id}</td>
                    <td>{event.eventName}</td>
                    <td>{event.eventDate.eventStartDate?.toDate()?.toLocaleDateString()}</td>
                    <td>{event.eventDate.eventEndDate?.toDate()?.toLocaleDateString()}</td>
                    <td>{event.eventDate.eventDuration} Days</td>
                    <td>{event.eventDiscount}%</td>
                    <td>
                        <div className='flex flex-col items-center gap-2'>
                            <button className='px-4 py-2 rounded-full bg-red-600'>Delete</button>
                            <Link href={`admin/products/details/${event.id}`} className='px-4 py-2 rounded-full bg-blue-600'> Details</Link>
                            <Link href={`admin/products/edit/${event.id}`} className='px-4 py-2 rounded-full bg-green-600'>Edit</Link>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>  
    </div>
    </>
  )
}

export default AdminEvent