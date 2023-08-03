import { api } from '@/utils/api';
import dynamic from 'next/dynamic';
import React from 'react';
const ProductLoading = dynamic(() => import('@/components/ProductLoading'));
const Detail = dynamic(() => import('@/ui/Product/detail'), {
  loading: () => <ProductLoading />,
  ssr: false,
});
type data = [];

const getData = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
export default async function page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return <Detail data={data} />;
}
