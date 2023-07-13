'use client'

import React, { useState } from 'react';
import Image from 'next/image';

function PurchasePage({name, price, discount, image}: any) {
  const [total, setTotal] = useState(price);

  const handlePurchase = () => {
    alert(`You have successfully purchased ${name} item(s) for Rp. ${total}.`);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-center text-3xl font-semibold text-slate-500 mb-8">Purchase Page</h2>
      <div className='h-[120px] max-w-full relative'>
        <Image src={image} alt='' className='object-cover' width={360} height={180}/>
    </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-slate-600">Product Name</h4>
        <span className="text-gray-500">{name}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium text-slate-600">Price</h4>
        <div className="flex items-center">
          <span className="px-2 py-1 text-lg border border-l-0 rounded-r-md">Rp. </span>
          <span className="px-2 py-1 text-lg border rounded-l-md rounded-r-md">{price}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={handlePurchase} className="px-4 py-2 rounded-full bg-lime-600 text-white">
          Purchase
        </button>
      </div>
    </div>
  );
}

export default PurchasePage;