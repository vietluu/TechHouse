import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';
import { cookies } from 'next/headers'; // Import cookies

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

const Product = dynamicImport(() => import('@/ui/Product'), { ssr: false });
type data = any;
const getData = async (data: number) => {
  console.log(data);
  // const nextCookies = cookies(); // Get cookies object
  // const token = nextCookies.get('token')?.value // Find cookie
  // {
  //   headers: {
  //     Authorization: 'BEARER ' + token
  //   }
  // }
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
