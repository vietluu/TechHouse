'use client';
import Image from 'next/image';
import React, { memo, useState } from 'react';

function SlideProduct({ image }: { image: string[] | any }) {
  const imageList: string[] = Array.isArray(image)
    ? image.filter(Boolean)
    : image
    ? [image]
    : [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (imageList.length === 0) {
    return (
      <div className="w-full aspect-square bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
        <i className="fas fa-image text-4xl"></i>
      </div>
    );
  }

  const currentImage = imageList[activeIndex] || imageList[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-[480px] mx-auto select-none">
      {/* Main Image Showcase */}
      <div className="relative w-full aspect-square bg-slate-50/80 rounded-3xl overflow-hidden border border-slate-150 shadow-soft group flex items-center justify-center p-4">
        <Image
          src={currentImage}
          alt="product showcase"
          width={600}
          height={600}
          priority
          quality={95}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Prev / Next Controls if multiple images */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 sm:opacity-90 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left text-xs"></i>
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 sm:opacity-90 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </>
        )}

        {/* Counter Badge */}
        {imageList.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-slate-900/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            {activeIndex + 1} / {imageList.length}
          </span>
        )}
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1.5 scrollbar-thin">
          {imageList.map((imgUrl: string, idx: number) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={`${imgUrl}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-13 sm:h-13 rounded-xl overflow-hidden p-1 bg-white border-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-sky-600 ring-2 ring-sky-500/20 shadow-xs scale-102'
                    : 'border-slate-200 hover:border-sky-300 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(SlideProduct);
