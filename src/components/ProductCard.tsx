'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Star from '@/components/Star';
import { product } from '@/types/productType';

interface ProductCardProps {
  product: product;
  showRating?: boolean;
  variant?: 'vertical' | 'horizontal';
  className?: string;
}

export default function ProductCard({
  product,
  showRating = true,
  variant = 'vertical',
  className = '',
}: ProductCardProps) {
  const originalPrice =
    product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null;

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/product/${product.id}`}
        className={`mobile_sale group flex items-center gap-3 p-2 bg-white rounded-2xl border border-slate-150 shadow-soft hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${className}`}
      >
        <div className="relative w-[90px] h-[90px] flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            height={200}
            width={200}
            className="w-full h-full object-contain p-1 group-hover:scale-108 transition-transform duration-300"
            src={product.thumbnail}
            alt={product.title}
          />
          {product.discountPercentage > 0 && (
            <span className="sale text-[10px] py-0.5 px-1.5 top-1 left-1 absolute">
              -{Math.ceil(product.discountPercentage)}%
            </span>
          )}
        </div>
        <div className="right_info flex-1 min-w-0">
          <p
            className="mobile_name break-words text-sm sm:text-xs leading-snug line-clamp-2 text-slate-800 group-hover:text-sky-600 transition-colors font-semibold mb-1"
            title={product.title}
          >
            {product.title}
          </p>
          <p className="mobile_paid flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-base sm:text-sm font-bold text-rose-600">
              {product.price}$
            </span>
            {originalPrice && (
              <s className="text-xs sm:text-[11px] text-slate-400">
                {originalPrice}$
              </s>
            )}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className={`rounded-2xl w-full h-full bg-white p-3 border border-slate-150 shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col group ${className}`}
    >
      {/* Thumbnail & Sale Badge */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50 mb-3 flex items-center justify-center">
        <Image
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          width={400}
          height={400}
          src={product.thumbnail}
          alt={product.title}
          quality={90}
          priority={false}
          title={product.title}
        />
        {product.discountPercentage > 0 && (
          <span className="sale text-xs font-semibold px-2 py-0.5 rounded-full top-2 left-2 absolute">
            -{Math.floor(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Product Title */}
      <p
        className="mobile_name text-slate-800 group-hover:text-sky-600 transition-colors font-semibold text-sm sm:text-xs line-clamp-2 mb-2 break-words min-h-[2.5rem] sm:min-h-[2rem]"
        title={product.title}
      >
        {product.title}
      </p>

      {/* Product Price */}
      <p className="mobile_paid mt-auto mb-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-lg sm:text-sm font-bold text-rose-600">
          {product.price}$
        </span>
        {originalPrice && (
          <span className="text-xs sm:text-[11px] text-slate-400 line-through">
            {originalPrice}$
          </span>
        )}
      </p>

      {/* Rating & Stock */}
      {showRating && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-1 pt-1 border-t border-slate-100 text-xs sm:text-[11px]">
          <Star rate={product.rating} />
          <span className="text-xs sm:text-[10px] text-slate-400">
            {`(${product.stock})`}
          </span>
        </div>
      )}
    </Link>
  );
}
