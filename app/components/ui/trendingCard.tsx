import React from "react";
import Image from "next/image";
import "@/app/dashboard/trending/trending.css";
import ApplicationPrice from "@/app/dashboard/trending/trendingPrice";

type Tags = {
   tag1: string;
   tag2: string;
   tag3: string;
   tag4: string;
};

interface PopularCardType {
   id: any;
   image: any;
   title: any;
   tags: Tags;
   price: number;
   discountpercentage: number;
}

const PopularCard = ({
   id,
   image,
   title,
   tags,
   price,
   discountpercentage,
}: PopularCardType) => {
   return (
      <>
         <a
            href={`/products/${id}`}
            className="tab_item app_impression_tracked"
         >
            <div className="tab_item_cap" style={{ width: 184, height: 69 }}>
               <Image
                  className="tab_item_cap_img"
                  src={image}
                  alt=""
                  id="delayedimage_home_tabs_autoload_6"
                  fill
               />
            </div>
            <ApplicationPrice
               price={price}
               discountpercentage={discountpercentage}
            />
            <div className="tab_item_content">
               <div className="tab_item_name">{title}</div>
               <div className="tab_item_details">
                  <span className="platform_img win" />
                  <div className="tab_item_top_tags">
                     <span className="top_tag">{tags.tag1}</span>
                     <span className="top_tag">, {tags.tag2}</span>
                     <span className="top_tag">, {tags.tag3}</span>
                     <span className="top_tag">, {tags.tag4}</span>
                  </div>
               </div>
            </div>
            <div style={{ clear: "both" }}></div>
         </a>
      </>
   );
};

export default PopularCard;
