"use client";

import React, { useState } from "react";

function TopUp() {
   const [amount, setAmount] = useState<number>(0);
   const [alert, setAlert] = useState<string>("");

   const handleAmountChange = (event: any) => {
      setAmount(event.target.value);
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setAmount(0);
      setAlert(`Succesfully added Rp. ${amount} to your Account!`);
   };

   return (
      <div className="max-w-2xl mx-auto py-8">
         <h1 className="text-center text-3xl font-semibold text-white-75 text-[28px] mb-8">
            Top Up
         </h1>
         {alert && <p>{alert}</p>}
         <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               <div className="sm:col-span-4">
                  <label
                     htmlFor="amount"
                     className="block text-sm font-medium leading-6 text-slate-500"
                  >
                     Amount:
                  </label>
                  <div className="mt-2">
                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                           type="number"
                           name="amount"
                           id="amount"
                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white/75 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                           value={amount}
                           onChange={handleAmountChange}
                           required
                        />
                     </div>
                  </div>
               </div>
            </div>
            <button
               type="submit"
               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-end"
            >
               Top Up
            </button>
         </form>
      </div>
   );
}

export default TopUp;
