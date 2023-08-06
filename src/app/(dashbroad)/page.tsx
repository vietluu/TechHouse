import { product } from '@/types/productType';
import { api } from '@/utils/api';
import dynamic from 'next/dynamic';
const Home = dynamic(() => import('@/ui/HomePage'), { ssr: true });

type data = { products: []; total: number; skip: number; limit: number };
const getData = async () => {
  const res = await api.get(`/products`);
  return res.data;
};

export default async function page() {
  const data: data = await getData();
  const saleOff: product[] = data.products
    .sort(
      (a: product, b: product) => b.discountPercentage - a.discountPercentage
    )
    .slice(0, 9);
  const newProduct: product[] = data.products
    .sort((a: product, b: product) => a.price - b.price)
    .slice(0, 10);

  return <Home saleOff={saleOff} newProduct={newProduct} />;
}
