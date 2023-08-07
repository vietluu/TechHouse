import { api } from '@/utils/api';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;
const Product = dynamicImport(() => import('@/ui/Product'));
type data = { products: []; total: number; skip: number; limit: number };
const getData = async (data: number) => {
  const res = await api.get(
    `/products?skip=${(data ? data - 1 : 0) * 10}&limit=20`
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
  const data: data = await getData(page);
  return <Product data={data} />;
}
