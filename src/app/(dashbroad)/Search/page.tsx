import { api } from '@/utils/api';
import dynamicImport from 'next/dynamic';
import Loading from './loading';

const Product = dynamicImport(() => import('@/ui/Product'), {
  loading: () => <Loading />,
});
export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;

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
