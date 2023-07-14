"use client";

import { collection, getDocs } from "firebase/firestore";
import { firestoredb } from "@/firebase/firebaseconfig";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ProductType {
   id: string;
   applicationName: string;
}

export default function SearchBar() {
   const [searchTerm, setSearchTerm] = useState("");
   const [fetchedproducts, setFetchedProducts] = useState<ProductType[]>([]);
   const [products, setProducts] = useState<ProductType[]>([]);
   const [loading, setLoading] = useState(false);

   // Data Fetch
   useEffect(() => {
      const fetchProducts = async () => {
         setLoading(true);
         setProducts([]);

         const productsCollection = collection(firestoredb, "applicationlist");
         const querySnapshot = await getDocs(productsCollection);
         const productsData: ProductType[] = [];
         let count = 0;
         querySnapshot.forEach((doc) => {
            const product = { id: doc.id, ...doc.data() } as ProductType;
            productsData.push(product);
            count++;
         });
         setFetchedProducts(productsData);
      };
      fetchProducts();
   }, []);

   // Search Field
   useEffect(() => {
      if (searchTerm.trim() === "") {
         setLoading(false);
         return;
      }
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const productsData: ProductType[] = [];
      let count = 0;
      fetchedproducts.forEach((doc) => {
         if (count >= 3) return;
         const product = { ...doc } as ProductType;
         if (
            product.applicationName.toLowerCase().includes(lowercaseSearchTerm)
         ) {
            productsData.push(product);
            count++;
         }
      });
      setProducts(productsData);
      setLoading(false);
   }, [searchTerm]);

   const handleSearchChange = (event: any) => {
      setSearchTerm(event.target.value);
   };

   return (
      <>
         <div className="relative">
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
                        <Link
                           href={`/products/${product.id}`}
                           className="cursor-pointer"
                        >
                           <p>{product.applicationName}</p>
                        </Link>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </>
   );
}
