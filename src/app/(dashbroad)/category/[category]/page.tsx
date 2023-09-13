import { api } from '@/utils/api';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import Loading from '../loading';
import { product } from '@/types/productType';

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;
const Product = dynamicImport(() => import('@/ui/Product'), {
  loading: () => <Loading />,
});
type data = { products: []; total: number; skip: number; limit: number };
const getData = async (
  category: string | any,
  page: number,
  oderBy: string,
  rating: string,
  range: string
) => {
  const res = await api.get(`/products?limit=100`);

  res.data.products = await res.data.products.filter(
    (data: product) => data.category === category
  );

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
  params: string | any;
  searchParams: { [key: string]: string };
}) {
  const data: data = await getData(
    params?.category,
    Number(searchParams.page || 1),
    searchParams.oderBy,
    searchParams.rating,
    searchParams.range
  );
  return <Product data={data} />;
}
