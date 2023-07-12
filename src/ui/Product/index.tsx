'use client'
import React from 'react'
import { product } from '@/types/productType'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function index({ data }: {data:[]}) {
     
     const path = usePathname()
     return (
     <div className="fluid_container">

          <div className="filter">
               <ul>
                    <li>
                         <a href="#">
                              <i className="fa-solid fa-sliders"></i> Bộ lọc
                         </a>
                    </li>
               </ul>
          </div>

          <div className="product">
               <div className="grid place-content-center items-center  gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 grid-cols-5	">
                  {data.length && data.map((value: product) => (
                       <Link href={path+'/'+value.id} className="w-full h-full  bg-white block px-5 py-3">
                       <Image className='aspect-[1/1]' width={200} height={200} priority src={value?.images[0]} alt=""/>
                       <p className="mobile_name">
                           {value.title}
                       </p>
                          <p className="mobile_paid">
                          {value.price}
                       </p>
                   </Link>
                   ))}
               </div>
          </div>
     </div>

  )
}
