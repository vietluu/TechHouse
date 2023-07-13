import { api } from "@/utils/api";
import dynamicImport from "next/dynamic";
import { cookies } from 'next/headers'; // Import cookies

export const dynamic = 'force-dynamic'
export const revalidate = 60
export const dynamicParams = true

const Product = dynamicImport(() => import('@/ui/Product'))
type data = any;
const getData = async () => {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get('token')?.value // Find cookie
  {
    headers: {
      Authorization: 'BEARER ' + token
    }
  }
  const res = await api.get(`/products?limit=20`);
  console.log(res.data)
  return res.data;
}

export default async function page() {
  const data:data = await getData()
  return (
      <Product data={data} />
  )
}