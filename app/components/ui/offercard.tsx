import React from "react";
import Image from "next/image";
import Link from "next/link";

function OfferCard({
   id,
   event,
   wallpaper,
   title,
   enddate,
   endtime,
   discountpercentage,
   originalprice,
   discountedprice,
}: any) {
   return (
      <div>
         <Link href={`/products/${id}`}>
            <div className="w-full h-[200px] relative">
               <Image src={wallpaper} alt="" className="object-cover" fill />
            </div>
            <div className="bg-gradient-to-r from-[#1b2d44] to-[#2f60a0] h-[10rem]">
               <div className="hidden md:block">
                  <p className="text-[18px] text-white pl-4 pt-2">{event}</p>
                  <p className="text-[15px] text-white pl-4 pt-2">{title}</p>
                  <p className="text-[12px] text-white pl-4 pt-2">
                     Offer ends {enddate} @ {endtime}.
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row">
                  <div className="max-w-[6rem] bg-[#5c7e10] ml-4 mt-2">
                     <p className="text-[28px] text-white pl-2 pr-2 mt-1">
                        -{discountpercentage}%
                     </p>
                  </div>
                  <div className="max-w-[10rem] bg-[#344654] mt-2">
                     <p className="text-gray-500 text-[12px] line-through pl-2 pr-2 text-end">
                        Rp. {originalprice.toLocaleString()}
                     </p>
                     <p className="text-[#5c7e10] text-[18px] pl-2 pr-2 text-end">
                        Rp. {discountedprice.toLocaleString()}
                     </p>
                  </div>
               </div>
            </div>
         </Link>
      </div>
   );
}

export default OfferCard;
