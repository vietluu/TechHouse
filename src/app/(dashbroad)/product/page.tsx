import ProductLoading from '@/components/ProductLoading';
import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;
// import Product from '@/components/Product';
import { Listproduct } from '@/types/productType';
const Product = dynamicImport(() => import('@/ui/Product'), {
  ssr: false,
  loading: () => <ProductLoading />,
});
type data = { products: []; total: number; skip: number; limit: number };
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
