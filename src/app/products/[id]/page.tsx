"use client"

import React, { useEffect, useState } from 'react'
import ProductImage from './productImage';
import Image from 'next/image';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { firestoredb } from '../../../../firebase/firestore';
import TempIMG from 'public/assets/images/munir.jpg';
import Icon from 'public/assets/images/icon.jpg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Loading from './loading';
import './product.css';
import ProductActions from './productactions';

interface ProductType {
  applicationName:string;
  applicationImage:string;
  applicationPublisher:string;
  applicationReleaseDate:string;
  applicationDownloadLink:string;
  applicationDescription:string;
  applicationPrice:number;
}

function ProductList({ params }: { params: {id:string}}) {
  const appID = String(params.id);
  const [applicationData, setApplicationData] = useState<ProductType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  //had to use this because NextJS Link Component's bug -> it cannot do Soft Navigation from dynamic pages (out of my control)
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestoredb, 'applicationlist', appID);
      const docSnapshot = await getDoc(docRef);
      const productData = docSnapshot.data() as ProductType;
      setApplicationData(productData);
      setIsLoading(false);
    };
    fetchData();
  }, [appID])
    
  return (
    <>
    {isLoading ? (
      <Loading />
    ) : (
      <div className="max-w-3xl items-center justify-center">
        <div className='pl-10 pr-10 leading-[16.1px] text-center bg-gradient-to-b from-transparent to-slate-400 text-gray-700 h-[620px] absolute bottom-0'>
          <h2 className="text-center text-3xl font-semibold text-[42px] text-slate-500 mb-8">{applicationData?.applicationName}</h2>
            <div className="grid grid-cols-2 gap-[5rem]">
              <div className="mb-8 p-5">
                <ProductImage image={applicationData?.applicationImage} />
              </div>
                <div className='game-box'>
                  <div className='game-box-inner'>
                    <div className='game-icon'>
                      <Image className="game-icon-inner" src={Icon} alt="icon" width={100} height={100}/>
                    </div>
                    <div className='game-name pt-5'>
                        <h3 className="block text-sm font-medium text-slate-600 text-[38px] mb-8">
                          {applicationData?.applicationName}
                        </h3>
                      </div>
                    <div className="col-span-2 sm:col-span-1 gap-8 justify-center">
                      <div>
                        <div className="desc">
                          <h4 className="block text-sm font-medium text-white/75 mb-1 text-[30px]">
                            {applicationData?.applicationDescription}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col items-center gap-4 pt-2'>
                    <ProductActions pathname={pathname} price={applicationData?.applicationPrice.toLocaleString()} discount={0} image={applicationData?.applicationImage}/>
                  </div>
                </div>
            </div>
          </div>
      </div>
    )}
    </>
  )
}

export default ProductList