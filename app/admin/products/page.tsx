'use client'

import React, { useEffect, useState } from 'react'
import ProductImage from './productImage';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { firestoredb } from '@/firebase/firebaseconfig';
import DeleteApplication from './delete/page';

interface ProductType {
        event: string;
        id: string;
        image: string;
        title: string;
        publisher: string;
        discountpercentage: number
        originalprice: number;
}

function AdminProduct() {

    const [productLists, setProductLists] = useState<ProductType[]>([]);

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
            const newApp = {
              event: app.currentEvent,
              id: app.id,
              image: app.applicationImage,
              title: app.applicationName,
              publisher: app.applicationPublisher,
              discountpercentage: app.discountpercentage,
              originalprice: app.applicationPrice,
            };
            setProductLists(prevState => [...prevState, newApp]);
        });
        })()
      }, [])


  return (
    <>
    <div className='item-center p-4'>
        <h2 className='text-center dark:text-white text-slate-600 text-[28px] mb-8'>Products</h2>
        <div className='items-end'>
          <Link href="/admin/products/new" className="px-4 py-2 rounded-full bg-green-600 text-white">
            Add New
          </Link>
        </div>
        <table className='border-collapse table-auto w-full'>
            <thead className='text-center border-b-2 dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200'>
                <tr>
                    <th>No</th>
                    <th>ID</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Publisher</th>
                    <th>Current Event</th>
                    <th>Normal Price</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody className='text-center bg-white dark:bg-slate-800'>
            {productLists.map((product, index) => (
                <tr className='h-[160px] border-b border-slate-600' key={product.id}>
                    <td>{index+1}</td>
                    <td>{product.id}</td>
                    <td><ProductImage image={product.image}/></td>
                    <td>{product.title}</td>
                    <td>{product.publisher}</td>
                    <td>{product.event}</td>
                    <td>{product.originalprice}</td>
                    <td>
                        <div className='flex flex-col items-center gap-2'>
                            <DeleteApplication ItemID={product.id}/>
                            <Link href={`admin/products/details/${product.id}`} className='px-4 py-2 rounded-full bg-blue-600'> Details</Link>
                            <Link href={`/admin/products/edit/${product.id}`} className='px-4 py-2 rounded-full bg-green-600'>Edit</Link>
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

export default AdminProduct