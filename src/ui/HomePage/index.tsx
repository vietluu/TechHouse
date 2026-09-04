'use client';
import AdModal from '@/components/AdModal';
import { product } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';
import { useTranslation } from '@/context/I18nContext';

export default function Home({
  saleOff,
  newProduct,
}: {
  saleOff: product[];
  newProduct: product[];
}) {
  const { t } = useTranslation();
  const setting: Settings | any = {
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
    <main className="flex flex-col items-center justify-between pb-12">
      <AdModal />
      <div className="slideshow-container">
        <Slider {...setting}>
          <Link className="img-box rounded-2xl overflow-hidden" href={'/category/mens-watches'}>
            <Image
              width={1200}
              height={500}
              priority
              src="/assets/images/banner/slideshow_1.jpg"
              alt={t('home.heroWatchTitle')}
              className="w-full h-full object-cover"
              quality={100}
            />
          </Link>
          <Link className="img-box rounded-2xl overflow-hidden" href={'/category/laptops'}>
            <Image
              priority
              src="/assets/images/banner/slideshow_2.jpg"
              alt={t('home.heroLaptopTitle')}
              width={1200}
              height={500}
              className="w-full h-full object-cover"
              quality={100}
            />
          </Link>
          <Link className="img-box rounded-2xl overflow-hidden" href={'/category/lighting'}>
            <Image
              width={1200}
              height={500}
              quality={100}
              priority
              src="/assets/images/banner/slideshow_3.jpg"
              alt={t('home.heroLightingTitle')}
              className="w-full h-full object-cover"
            />
          </Link>
        </Slider>
      </div>

      <div className="news">
        <div className="news-container">
          <Link href="/category/mens-watches" className="tab-news group">
            <div className="overflow-hidden rounded-xl">
              <Image
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_1.jpg"
                alt="Đồng hồ thời trang"
              />
            </div>
          </Link>

          <Link href="/category/smartphones" className="tab-news group">
            <div className="overflow-hidden rounded-xl">
              <Image
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_2.jpg"
                alt="Điện thoại thông minh"
              />
            </div>
          </Link>

          <Link href="/product" className="tab-news group">
            <div className="overflow-hidden rounded-xl">
              <Image
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                height={400}
                width={400}
                src="/assets/images/banner/img_banner_home_3.jpg"
                alt="Phụ kiện công nghệ"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="fluid_container">
        <div className="product">
          <section className="news_product">
            <div className="product_title">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full inline-block mb-2">
                {t('home.newCollectionBadge')}
              </span>
              <h2>{t('home.newProductsTitle')}</h2>
              <h4>{t('home.newProductsSubtitle')}</h4>
            </div>

            <div className="device_product" id="product_show">
              {newProduct && newProduct.length > 0 &&
                newProduct.map((value: product) => (
                  <Link
                    key={value.id}
                    href={`/product/${value.id}`}
                    className="mobile_info group"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 mb-3 flex items-center justify-center">
                      <Image
                        height={400}
                        width={400}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        src={value.thumbnail}
                        alt={value.title}
                      />
                      {value.discountPercentage > 0 && (
                        <span className="sale">
                          -{Math.ceil(value.discountPercentage)}%
                        </span>
                      )}
                    </div>
                    <p className="mobile_name break-words text-sm sm:text-xs leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2rem]" title={value.title}>{value.title}</p>
                    <p className="mobile_paid flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                      <span className="text-base sm:text-sm font-bold text-rose-600">{value.price}$</span>
                      {value.discountPercentage > 0 && (
                        <s className="text-xs sm:text-[11px] text-slate-400">
                          {(
                            value.price /
                            (1 - value.discountPercentage / 100)
                          ).toFixed(2)}
                          $
                        </s>
                      )}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        <div className="sale_off">
          <div className="side_left">
            <Link href="/category/laptops" className="group">
              <Image
                height={400}
                width={600}
                src="/assets/images/banner/img_banner_center_1.jpg"
                alt={t('home.laptopBanner1')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </Link>
            <Link href="/category/laptops" className="group">
              <Image
                height={400}
                width={600}
                src="/assets/images/banner/img_banner_center_2.jpg"
                alt={t('home.laptopBanner2')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </Link>
          </div>
          <div className="side_right">
            <Link href="/category/laptops" className="group">
              <Image
                height={800}
                width={600}
                src="/assets/images/banner/img_banner_center_3.jpg"
                alt={t('home.laptopBanner3')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </Link>
          </div>
        </div>

        <div className="sale_device">
          <div className="product">
            <section className="news_product">
              <div className="product_title">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block mb-2">
                  {t('home.hotDealsBadge')}
                </span>
                <h2>{t('home.saleProductsTitle')}</h2>
                <h4>{t('home.saleProductsSubtitle')}</h4>
              </div>
              <div className="device_product_sale">
                {saleOff && saleOff.length > 0 &&
                  saleOff.map((value: product) => (
                    <Link
                      key={value.id}
                      href={`/product/${value.id}`}
                      className="mobile_sale group"
                    >
                      <div className="relative w-[90px] h-[90px] flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                        <Image
                          height={200}
                          width={200}
                          className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-300"
                          src={value.thumbnail}
                          alt={value.title}
                        />
                        {value.discountPercentage > 0 && (
                          <span className="sale text-[10px] py-0.5 px-1.5 top-1 left-1">
                            -{Math.ceil(value.discountPercentage)}%
                          </span>
                        )}
                      </div>
                      <div className="right_info">
                        <p className="mobile_name break-words text-sm sm:text-xs leading-snug line-clamp-2" title={value.title}>{value.title}</p>
                        <p className="mobile_paid flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                          <span className="text-base sm:text-sm font-bold text-rose-600">{value.price}$</span>
                          {value.discountPercentage > 0 && (
                            <s className="text-xs sm:text-[11px] text-slate-400">
                              {(
                                value.price /
                                (1 - value.discountPercentage / 100)
                              ).toFixed(2)}
                              $
                            </s>
                          )}
                        </p>
                      </div>
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
