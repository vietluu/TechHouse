import { api } from '@/utils/api';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import Loading from './loading';
import { product } from '@/types/productType';
import Image from 'next/image';
import BreadCrumb from '@/components/BreadCrumb';

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;
const Product = dynamicImport(() => import('@/ui/Product'), {
  loading: () => <Loading />,
});
type data = { products: []; total: number; skip: number; limit: number };
const getData = async (
  page: number,
  oderBy: string,
  rating: string,
  range: string
) => {
  const res = await api.get(`/products?limit=100`);
  if (oderBy) {
    switch (oderBy) {
      case 'increment':
        res.data.products?.sort((a: product, b: product) => a.price - b.price);
        break;
      case 'decrement':
        res.data.products?.sort((a: product, b: product) => b.price - a.price);
        break;
      default:
        break;
    }
  }
  if (rating) {
    const dataRate = res.data.products.filter(
      (e: product) =>
        e.rating >= Number(rating) && e.rating <= Number(rating) + 1
    );
    res.data.products = dataRate;
  }
  if (range) {
    const slide = range.split('-');
    const dataRate = res.data.products.filter(
      (e: product) => e.price >= Number(slide[0]) && e.price <= Number(slide[1])
    );
    res.data.products = dataRate;
  }
  res.data.total = res.data.products.length;

  let arr = res.data.products;
  res.data.products = arr.slice(
    (page - 1) * 30,
    page * 30 > res.data.total ? res.data.total : page * 30
  );
  return res.data;
};
export const metadata: Metadata = {
  title: 'Product',
};

export default async function page({
  params,
  searchParams,
}: {
  params: string;
  searchParams: { [key: string]: string };
}) {
  let page = Number(searchParams.page) || 1;
  const data: data = await getData(
    page,
    searchParams.oderBy,
    searchParams.rating,
    searchParams.range
  );
  return (
    <div className="w-full">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-100/70 border-b border-slate-200/60 py-3 mb-6 sm:mb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-3">
          <BreadCrumb title={null} />
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-3 mb-6 sm:mb-4">
        <div className="w-full overflow-hidden rounded-2xl sm:rounded-xl shadow-xs border border-slate-150 bg-slate-50">
          <div className="relative w-full h-[280px] md:h-[200px] sm:h-[145px]">
            <Image
              quality={100}
              src="/assets/Image/product_banner.webp"
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 1280px"
              className="object-cover object-center"
              priority
              alt="product banner"
            />
          </div>
        </div>
      </div>

      <Product data={data} />
    </div>
  );
}
