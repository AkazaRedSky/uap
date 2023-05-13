import React from 'react'
import Image from 'next/image'

function EditProductImage({image}:any) {
  return (
    <>
    <div className='h-[400px] max-w-full relative'>
        <Image src={image} alt='' className='object-cover' fill/>
    </div>
    </>
  )
}

export default EditProductImage