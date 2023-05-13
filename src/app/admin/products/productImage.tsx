import React from 'react'
import Image from 'next/image'

function ProductImage({image}:any) {
  return (
    <>
    <div className='h-[120px] max-w-full relative'>
        <Image src={image} alt='' className='object-cover' width={240} height={120}/>
    </div>
    </>
  )
}

export default ProductImage