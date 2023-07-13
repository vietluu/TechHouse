import React from 'react'
import { product } from '@/types/productType'
import Image from 'next/image'
function detail({data}: {data:product}) {
 return (
      
 <section className="productDetail">
        <div className=" container grid grid-cols-2 md:grid-cols-1 ">


            <div className=" max-h-[600px] h-full">
                <div className="col c-2 choose_left pd-3">
                    <Image width={400} height={400} className='aspect-[1/1]  max-w-[400px] max-h-[400px]' priority src={data.thumbnail} alt='image'/>
                </div>
              
            </div>

            <div className="">

                <div className="product-description">
                     <span id="product_id">{data.title}</span>
                    <h1 id="title_product"></h1>
                    
                    <p>{data.description}</p>
                     <p>{data.category}</p>
                    

                </div>


              

                 
                <div className="product-price c-10 l-10 m-12 mg-0 row" >
                    <div id="paid" className='c-3 l-5 m-6' >
                    <p>{ data.price}</p>
                    </div>
                    <button type='button' id='btn_process' className='cart-btn c-3 l-6 m-6'>Thêm vào giỏ</button>
                </div>
            </div>

        </div>

 </section>
  )
}

export default detail