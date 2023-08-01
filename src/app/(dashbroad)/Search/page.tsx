import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;

const Product = dynamicImport(() => import('@/ui/Product'), { ssr: true });
type data = any;
const getData = async (query: string, data: number) => {
  const res = await api.get(
    `/products/search?q=${query}&skip=${(data ? data - 1 : 0) * 10}&limit=20`
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
  const data: data = await getData(
    searchParams.keyword,
    Number(searchParams.page)
  );
  if (data?.products?.length < 1) {
    return (
      <div className="fluid_container">
        <h3 className="text-2xl py-[50px] text-center">
          {' '}
          Result for {`"`}
          {searchParams.keyword}
          {`"`}: No Data
        </h3>
      </div>
    );
  }
  return <Product data={data} />;
}
