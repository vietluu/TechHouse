import { PropsType } from '@/types/propsType';
import { api } from '@/utils/api';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
const ProductLoading = dynamic(() => import('@/components/ProductLoading'));
const Detail = dynamic(() => import('@/ui/Product/detail'), {
  loading: () => <ProductLoading />,
  ssr: false,
});
type data = [];
export async function generateMetadata(
  { params, searchParams }: PropsType,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const res = await api.get(`/products/${id}`);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: res.data.title,

    openGraph: {
      images: [`${res.data.thumbnail}`] || [...previousImages],
    },
  };
}
const getData = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
export default async function page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return <Detail data={data} />;
}
