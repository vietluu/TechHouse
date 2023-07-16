import Detail from '@/ui/Product/detail';
import { api } from '@/utils/api';
import React from 'react';

type data = [];

const getData = async (id: number) => {
  // const nextCookies = cookies(); // Get cookies object
  // const token = nextCookies.get('token')?.value // Find cookie
  // {
  //   headers: {
  //     Authorization: 'BEARER ' + token
  //   }
  // }
  const res = await api.get(`/products/${id}`);
  return res.data;
};
export default async function page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return <Detail data={data} />;
}
