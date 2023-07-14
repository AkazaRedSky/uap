"use client";

import React, { useEffect, useState } from "react";
import "./trending.css";

interface AppPriceType {
   price: number;
   discountpercentage: number;
}

function ApplicationPrice({ price, discountpercentage }: AppPriceType) {
   const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
   const [discountPrice, setDiscountPrice] = useState<number>(0);

   useEffect(() => {
      if (discountpercentage != 0) {
         setIsDiscounted(true);
         setDiscountPrice(((100 - discountpercentage) / 100) * price);
      }
   }, [discountpercentage, price]);

   return (
      <>
         {isDiscounted ? (
            <div className="discount_block tab_item_discount">
               <div className="discount_pct">-{discountpercentage}%</div>
               <div className="discount_prices">
                  <div className="discount_original_price">
                     Rp. {price.toLocaleString()}
                  </div>
                  <div className="discount_final_price">
                     Rp. {discountPrice.toLocaleString()}
                  </div>
               </div>
            </div>
         ) : (
            <div className="discount_block tab_item_discount no_discount">
               <div className="discount_final_price">
                  Rp. {price.toLocaleString()}
               </div>
            </div>
         )}
      </>
   );
}

export default ApplicationPrice;
