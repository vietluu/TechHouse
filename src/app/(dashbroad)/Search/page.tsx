import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';
import Loading from './loading';
import { product } from '@/types/productType';

const Product = dynamicImport(() => import('@/ui/Product'), {
  loading: () => <Loading />,
});
export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;

type data = any;
const getData = async (
  query: string,
  page: number,
  oderBy: string,
  rating: string,
  range: string
) => {
  const res = await api.get(`/products/search?q=${query}&limit=100`);
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

export default async function page({
  params,
  searchParams,
}: {
  params: string;
  searchParams: { [key: string]: string };
}) {
  const data: data = await getData(
    searchParams.keyword,
    Number(searchParams.page) || 1,
    searchParams.oderBy,
    searchParams.rating,
    searchParams.range
  );
  if (data?.products?.length < 1) {
    return (
      <div className="fluid_container">
        <h3 className="text-2xl py-[50px] text-center">
          {' '}
          Kết quả tìm kiếm {`"`}
          {searchParams.keyword}
          {`"`}: Không có dữ liệu
        </h3>
      </div>
    );
  }
  return (
    <>
      <div className="fluid_container">
        <h3 className="text-2xl px-3 pt-3 text-left">
          {' '}
          Kết quả tìm kiếm {`"`}
          {searchParams.keyword}
          {`"`}:
        </h3>
      </div>
      <Product data={data} />
    </>
  );
}
