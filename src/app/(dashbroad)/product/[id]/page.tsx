import { product, Listproduct } from '@/types/productType';
import { PropsType } from '@/types/propsType';
import { api } from '@/utils/api';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
const Detail = dynamic(() => import('@/ui/Product/detail'));
type data = [];
export async function generateMetadata({
  params,
  searchParams,
}: PropsType): Promise<Metadata> {
  const id = params.id;
  const res = await api.get(`/products/${id}`);
  return {
    title: res.data.title,

    openGraph: {
      images: [`${res.data.thumbnail}`] || [],
    },
  };
}
const getData = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
const getSubData = async (category: string) => {
  const res = await api.get(`/products/category/${category}?limit=10`);
  return res.data;
};
export default async function page({ params }: { params: { id: number } }) {
  const data: {
    product: product | any;
    sub: Listproduct | any;
  } = {
    product: null,
    sub: [],
  };
  const res = await getData(params.id);
  if (res) {
    await getSubData(res.category).then((sub) => {
      (data.product = res), (data.sub = sub);
    });
  }
  return <Detail data={data} />;
}
