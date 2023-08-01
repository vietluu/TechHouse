import Detail from '@/ui/Product/detail';
import { api } from '@/utils/api';
import React from 'react';

type data = [];

const getData = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
export default async function page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return <Detail data={data} />;
}
