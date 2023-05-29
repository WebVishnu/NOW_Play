import Image from 'next/image'
import React from 'react'

const error = () => {
  return (
    <div className='h-100 w-100 flex justify-center items-center'>
      <Image src="/404.svg" height={200} width={200} className='md:h-[70%] w-[100vw] md:w-[70%] h-100' alt='404 not found'/>
    </div>
  )
}

export default error