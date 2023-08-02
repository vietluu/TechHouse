import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';
import { cookies } from 'next/headers'; // Import cookies

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;

const Product = dynamicImport(() => import('@/ui/Product'), { ssr: true });
type data = any;
const getData = async (data: number) => {
  const res = await api.get(
    `/products?skip=${(data ? data - 1 : 0) * 10}&limit=20`
  );
  return res.data;
};

export default async function page({
  params,
  searchParams,
}: {
  params: string;
  searchParams: { [key: string]: string };
}) {
  const data: data = await getData(Number(searchParams.page));
  return <Product data={data} />;
}
