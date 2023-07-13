import React from 'react'
import Image from 'next/image'
import TempIMG from 'public/assets/images/munir.jpg';

function ProductImage({image}:any) {
  return (
    <>
    <div className='max-h-full max-w-full relative'>
        <Image src={image} alt='' className='object-cover' width={1920} height={720} loading='lazy'/>
    </div>
    </>
  )
}

export default ProductImage