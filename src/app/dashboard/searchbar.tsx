'use client'

import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestoredb } from '../../../firebase/firestore';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

interface ProductType {
    id: string;
    applicationName: string;
  }

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        setProducts([]);
  
        if (searchTerm.trim() === "") {
          setLoading(false);
          return;
        }

        const productsCollection = collection(firestoredb, "applicationlist");
        const querySnapshot = await getDocs(productsCollection);
        const productsData:ProductType[] = [];
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        let count = 0;
        querySnapshot.forEach((doc) => {
            if (count >= 3) return;
            const product = { id: doc.id, ...doc.data() } as ProductType;
            if (product.applicationName.toLowerCase().includes(lowercaseSearchTerm)) {
              productsData.push(product);
              count++;
            }
          });
        setProducts(productsData);
        setLoading(false);
      };
  
      fetchProducts();
    }, [searchTerm]);

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
      };

  return (
    <>
    <div className='relative'>
        <div className="flex items-center">
            <input
            type="search"
            placeholder="Search"
            className="pl-4 rounded-full placeholder:text-black text-black"
            value={searchTerm}
            onChange={handleSearchChange}
            />
        </div>
        {loading && (
          <div className="absolute bg-slate-900 mt-2 p-2 rounded-lg shadow-lg w-full">
            <p>Loading...</p>
          </div>
        )}

        {!loading && products.length === 0 && searchTerm.trim() !== "" && (
          <div className="absolute bg-slate-900 mt-2 p-2 rounded-lg shadow-lg w-full">
            <p>Not Found</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="absolute bg-slate-900 mt-2 p-2 rounded-lg shadow-lg w-full">
            {products.map((product) => (
              <div key={product.id}>
                <Link href={`/products/${product.id}`} className="cursor-pointer">
                    <p>{product.applicationName}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
    </>
  )
}
