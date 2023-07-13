'use client'

import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {getCookies} from 'typescript-cookie';

function ProductActions({pathname, price}:any) {
  const [cookieValue, setCookieValue] = useState<Boolean>(false);

  useEffect(() => {
    setCookieValue(Boolean(getCookies().CheatMode));
  
    return () => {
      
    }
  }, [cookieValue])
  

  return (
    <>
    {!cookieValue ? (
      <div>
      <div className="col-span-2">
        <h4 className="block text-sm font-medium text-lime-300 text-[30px]">
          Rp. {price}
        </h4>
      </div>
      <div className="flex justify-center">
        <Link href={`${pathname}/purchase`} className="px-4 py-2 rounded-full bg-lime-600 text-white" replace>
          Purchase
        </Link>
      </div>
    </div>
     ) : (
      <>
      <div className='col-span-2'>
        <p className='block text-sm font-medium text-sky-300 text-[30px]'>This Application is only for Windows</p>
      </div>
      <div className="flex justify-center">
        <Link href="https://cdn.discordapp.com/attachments/881940252502155326/1106541049519800380/game.rar" className="px-4 py-2 rounded-full bg-sky-500 text-white" replace={true}>
          Download
        </Link>
      </div>
      </>
      )}
      
    </>
  )
}

export default ProductActions