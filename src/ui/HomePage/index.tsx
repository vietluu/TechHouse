'use client';
import React, { useMemo } from 'react';
import AdModal from '@/components/AdModal';
import ProductCard from '@/components/ProductCard';
import { product } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import Slider, { Settings } from 'react-slick';
import { useTranslation } from '@/context/I18nContext';

// Import images from assets
import slide1 from '@assets/images/banner/slideshow_1.jpg';
import slide2 from '@assets/images/banner/slideshow_2.jpg';
import slide3 from '@assets/images/banner/slideshow_3.jpg';

import bannerHome1 from '@assets/images/banner/img_banner_home_1.jpg';
import bannerHome2 from '@assets/images/banner/img_banner_home_2.jpg';
import bannerHome3 from '@assets/images/banner/img_banner_home_3.jpg';

import bannerCenter1 from '@assets/images/banner/img_banner_center_1.jpg';
import bannerCenter2 from '@assets/images/banner/img_banner_center_2.jpg';
import bannerCenter3 from '@assets/images/banner/img_banner_center_3.jpg';

// Configuration for top hero slides
const HERO_SLIDES = [
  {
    href: '/category/mens-watches',
    image: slide1,
    titleKey: 'home.heroWatchTitle' as const,
  },
  {
    href: '/category/laptops',
    image: slide2,
    titleKey: 'home.heroLaptopTitle' as const,
  },
  {
    href: '/category/lighting',
    image: slide3,
    titleKey: 'home.heroLightingTitle' as const,
  },
];

// Configuration for promo category banners
const CATEGORY_BANNERS = [
  {
    href: '/category/mens-watches',
    image: bannerHome1,
    altKey: 'home.fashionWatch' as const,
  },
  {
    href: '/category/smartphones',
    image: bannerHome2,
    altKey: 'home.smartphones' as const,
  },
  {
    href: '/product',
    image: bannerHome3,
    altKey: 'home.techAccessories' as const,
  },
];

// Configuration for middle promo banners
const MIDDLE_LEFT_BANNERS = [
  {
    href: '/category/laptops',
    image: bannerCenter1,
    altKey: 'home.laptopBanner1' as const,
  },
  {
    href: '/category/laptops',
    image: bannerCenter2,
    altKey: 'home.laptopBanner2' as const,
  },
];

export default function Home({
  saleOff,
  newProduct,
}: {
  saleOff: product[];
  newProduct: product[];
}) {
  const { t } = useTranslation();

  const sliderSettings: Settings = useMemo(
    () => ({
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
    }),
    []
  );

  const SlickSlider = Slider as any;

  return (
    <main className="flex flex-col items-center justify-between pb-12">
      <AdModal />

      {/* Hero Carousel Banner */}
      <div className="slideshow-container">
        <SlickSlider {...sliderSettings}>
          {HERO_SLIDES.map((slide, idx) => (
            <Link key={idx} className="img-box" href={slide.href}>
              <Image
                width={1000}
                height={800}
                priority={idx === 0}
                src={slide.image}
                alt={t(slide.titleKey)}
                className="w-full h-full"
                quality={100}
              />
            </Link>
          ))}
        </SlickSlider>
      </div>

      {/* Featured Category Banners */}
      <div className="news">
        <div className="news-container">
          {CATEGORY_BANNERS.map((banner, idx) => (
            <Link key={idx} href={banner.href} className="tab-news">
              <Image
                className="w-full h-auto"
                height={400}
                width={400}
                src={banner.image}
                alt={t(banner.altKey)}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* New Products Section */}
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

            <div className="grid gap-4 sm:gap-2.5 grid-cols-4 md:grid-cols-2 sm:grid-cols-2" id="product_show">
              {newProduct && newProduct.length > 0 &&
                newProduct.map((value: product) => (
                  <ProductCard key={value.id} product={value} />
                ))}
            </div>
          </section>
        </div>

        {/* Middle Promo Banners */}
        <div className="sale_off">
          <div className="side_left effect">
            {MIDDLE_LEFT_BANNERS.map((banner, idx) => (
              <Link key={idx} href={banner.href}>
                <Image
                  height={400}
                  width={400}
                  src={banner.image}
                  alt={t(banner.altKey)}
                />
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            ))}
          </div>
          <div className="side_right effect++">
            <Link href="/category/laptops">
              <Image
                height={400}
                width={400}
                src={bannerCenter3}
                alt={t('home.laptopBanner3')}
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
        </div>

        {/* Sale Off / Hot Deals Section */}
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
                    <ProductCard key={value.id} product={value} variant="horizontal" />
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
