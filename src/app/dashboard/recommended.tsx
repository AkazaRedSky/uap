import React from "react";
import Image from 'next/image';
import { MdWebhook } from 'react-icons/md';
import TempIMG from 'public/assets/images/detroit.jpg';
import TempIMG2 from 'public/assets/images/detroit2.jpg';
import TempIMG3 from 'public/assets/images/detroit3.jpg';
import TempIMG4 from 'public/assets/images/detroit4.jpg';
import TempIMG5 from 'public/assets/images/detroit.jpg';

function Recommended() {
    return (
      <div className="mx-[2rem] mt-[2rem] text-white text-[14px] overflow-hidden" id="featured">
        <p>FEATURED</p>
        <div className="h-full md:h-[24rem] w-full flex flex-col  md:flex-row pt-3">
          <div className="w-full md:w-[62%] h-full bg-red-400 flex">
            <Image src={TempIMG} alt="" className="object-cover w-full" />
          </div>
          <div className="bg-[#0f1922] h-full w-full md:w-[38%] flex  flex-col justify-between">
            <div className="flex flex-col items-center">
              <p className="text-[30px] mt-3 text-center">Detroit Become Human</p>
              <div className="px-4 w-full h-[24rem] md:h-[15rem] pt-3">
                <div className="h-[35%] w-full flex pb-1 ">
                  <Image
                    src={TempIMG5}
                    alt=""
                    className="object-cover w-[50%] pr-1 "
                  />
                  <Image
                    src={TempIMG2}
                    alt=""
                    className="object-cover w-[50%] pl-1"
                  />
                </div>
                <div className="h-[35%]  w-full flex pt-1 ">
                  <Image
                    src={TempIMG3}
                    alt=""
                    className="object-cover w-[50%] pr-1"
                  />
                  <Image
                    src={TempIMG4}
                    alt=""
                    className="object-cover w-[50%] pl-1"
                  />
                </div>
                <div className=" flex flex-col items-center md:items-start  ">
                  <p className="text-[22px] pt-4">BEST SELLING</p>
                  {/* <div className="bg-[#8cc414] w-[6rem] rounded-[0.5rem] mt-1">
                    <p className="text-[18px] text-center">-50%</p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-between pr-4 gap-4 md:gap-0 -mt-4 md:mt-0 pb-2 md:pb-0">
              <div className="pl-4 pb-2 ">
                <p className="text-[14px] md:text-[20px]">Rp. 75.000</p>
              </div>
              <MdWebhook className="text-[15px] md:text-[24px] mb-[10px]" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Recommended;