'use client';
import Image from 'next/image';
import React, {
  memo,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Slider, { Settings } from 'react-slick';
function SlideProduct({ image }: { image: [string] }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const setting: Settings = {
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    swipe: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    adaptiveHeight: true,
    infinite: true,
  };
  const subSetting: Settings = {
    arrows: false,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    swipe: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    infinite: true,
    centerPadding: '30px',
    focusOnSelect: true,
  };

  useLayoutEffect(() => {
    setNav1(ref1.current);
    setNav2(ref2.current);
  }, []);
  return (
    <div className="max-w-[450px]">
      <Slider
        {...setting}
        //@ts-ignore
        asNavFor={nav2}
        ref={ref1}
      >
        {image?.map((data: string) => (
          <Image
            width={300}
            height={300}
            className="aspect-[1/1]"
            src={data}
            alt="product"
          />
        ))}
      </Slider>
      <Slider
        {...subSetting}
        ref={ref2}
        //@ts-ignore
        asNavFor={nav1}
      >
        {image?.map((data: string) => (
          <Image
            width={70}
            height={70}
            className="aspect-[1/1] mt-4 p-1"
            src={data}
            alt="product"
          />
        ))}
      </Slider>
    </div>
  );
}

export default memo(SlideProduct);
