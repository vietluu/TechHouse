'use client';
import AdModal from '@/components/AdModal';
import { product } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';

export default function Home({
  saleOff,
  newProduct,
}: {
  saleOff: product[];
  newProduct: product[];
}) {
  const setting: Settings = {
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipe: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    adaptiveHeight: true,
    infinite: true,
    customPaging: () => <span className="dot"></span>,
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AdModal />
      <div className="slideshow-container">
        <Slider {...setting}>
          <Link className="img-box" href={'/category/mens-watches'}>
            <Image
              width={1000}
              height={1000}
              priority
              src="/assets/images/banner/slideshow_1.jpg"
              alt=""
              className="w-full h-full"
              quality={100}
            />
          </Link>
          <Link className="img-box" href={'/category/laptops'}>
            <Image
              priority
              src="/assets/images/banner/slideshow_2.jpg"
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full"
              quality={100}
            />
          </Link>
          <Link className="img-box" href={'/category/lighting'}>
            <Image
              width={1000}
              height={1000}
              quality={100}
              priority
              src="/assets/images/banner/slideshow_3.jpg"
              alt=""
              className="w-full h-full"
            />
          </Link>
        </Slider>
      </div>

      <div className="news">
        <div className="news-container">
          <Link href="/category/mens-watches" className="tab-news">
            <Image
              height={400}
              width={400}
              src="/assets/images/banner/img_banner_home_1.jpg"
              alt=""
            />
          </Link>

          <Link href="/category/smartphones" className="tab-news">
            <Image
              height={400}
              width={400}
              src="/assets/images/banner/img_banner_home_2.jpg"
              alt=""
            />
          </Link>

          <Link href="product" className="tab-news">
            <Image
              height={400}
              width={400}
              src="/assets/images/banner/img_banner_home_3.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="fluid_container">
        <div className="product">
          <section className="news_product">
            <div className="product_title">
              <h2>Sản phẩm mới</h2>
              <h4>Cập nhật những sản phẩm mới nhất</h4>
            </div>

            <div className="device_product" id="product_show">
              {newProduct.length &&
                newProduct.map((value: product) => (
                  <Link
                    key={value.id}
                    href={`/product/${value.id}`}
                    className="mobile_info"
                  >
                    <Image
                      height={400}
                      width={400}
                      className="aspect-[1/1] "
                      src={value.thumbnail}
                      alt={value.title}
                    />
                    <p className="mobile_name">{value.title}</p>
                    <p className="mobile_paid">
                      {value.price} ${' '}
                      {value.discountPercentage > 0 && (
                        <s>
                          {(
                            value.price /
                            (1 - value.discountPercentage / 100)
                          ).toFixed(2)}
                          $
                        </s>
                      )}
                    </p>
                    {value.discountPercentage > 0 && (
                      <span className="sale animate-pulse">
                        -{Math.ceil(value.discountPercentage)}%
                      </span>
                    )}
                  </Link>
                ))}
            </div>
          </section>
        </div>

        <div className="sale_off">
          <div className="side_left effect">
            <Link href="/category/laptops">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_1.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
            <Link href="/category/laptops">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_2.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
          <div className="side_right effect++">
            <Link href="/category/laptops">
              <Image
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_center_3.jpg"
                alt=""
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
        </div>
        <div className="sale_device">
          <div className="product">
            <section className="news_product">
              <div className="product_title">
                <h2>Sản Phẩm Khuyễn mãi</h2>
                <h4>Giảm giá lên tới 50%</h4>
              </div>
              <div className="device_product_sale">
                {saleOff.length &&
                  saleOff.map((value: product) => (
                    <Link
                      key={value.id}
                      href={`/product/${value.id}`}
                      className="mobile_sale"
                    >
                      <Image
                        height={400}
                        width={400}
                        className="aspect-[1/1]"
                        src={value.thumbnail}
                        alt={value.title}
                      />
                      <div className="right_info">
                        <p className="mobile_name">{value.title}</p>

                        <p className="mobile_paid">
                          {value.price} ${' '}
                          {value.discountPercentage > 0 && (
                            <s>
                              {(
                                value.price /
                                (1 - value.discountPercentage / 100)
                              ).toFixed(2)}
                              $
                            </s>
                          )}
                        </p>
                      </div>

                      {value.discountPercentage > 0 && (
                        <span className="sale animate-pulse">
                          -{Math.ceil(value.discountPercentage)}%
                        </span>
                      )}
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
