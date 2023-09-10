'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function index() {
  return (
    <div className="fluid_container py-[10px] !bg-transparent">
      <div className="flex flex-wrap gap-7">
        <div className="px-3 sm:px-1 flex-grow-[8] basis-[300px] flex-shrink-0 mt-0">
          <div className="p-6 md:p-2 bg-white">
            <h2 className="text-2xl text-sky-500 font-bold pb-3">Giới thiệu</h2>
            <p className="py-3">
              Trang giới thiệu giúp khách hàng hiểu rõ hơn về cửa hàng của bạn.
              Hãy cung cấp thông tin cụ thể về việc kinh doanh, về cửa hàng,
              thông tin liên hệ. Điều này sẽ giúp khách hàng cảm thấy tin tưởng
              khi mua hàng trên website của bạn.
            </p>
            <p className="py-2">Một vài gợi ý cho nội dung trang Giới thiệu:</p>
            <ul className="list-disc pl-12 sm:pl-8">
              <li>Bạn là ai</li>
              <li>Giá trị kinh doanh của bạn là gì</li>
              <li>Địa chỉ cửa hàng</li>
              <li>Bạn đã kinh doanh trong ngành hàng này bao lâu rồi</li>
              <li>Bạn kinh doanh ngành hàng online được bao lâu</li>
              <li>Đội ngũ của bạn gồm những ai</li>
              <li>Thông tin liên hệ</li>
              <li>Liên kết đến các trang mạng xã hội (Twitter, Facebook)</li>
            </ul>
          </div>
        </div>
        <div className="flex-grow-[1] basis-[300px] flex-shrink-0 px-3">
          <div className="p-3 bg-white">
            <h2 className="border-b-4 border-black text-2xl text-sky-500 font-bold pb-3 text-center">
              Danh mục trang
            </h2>
            <div>
              <ul className="py-3">
                <li className="p-2">
                  {' '}
                  <Link href={'/about'} className="font-bold">
                    Giới thiệu
                  </Link>
                </li>
                <li className="p-2">
                  {' '}
                  <Link href={'#'}>Điều khoản dịch vụ</Link>
                </li>
                <li className="p-2">
                  {' '}
                  <Link href={'#'}>Chính sách bảo mật</Link>
                </li>
                <li className="p-2">
                  {' '}
                  <Link href={'#'}>Chính sách đổi trả</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 overflow-hidden">
            <Image
              className="hover:scale-150 duration-700"
              src="/assets/Image/about_banner.webp"
              width={500}
              height={300}
              alt="banner"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
