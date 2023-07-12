import dynamic from "next/dynamic";
const Home = dynamic(() => import('@/ui/HomePage'))

export default function page() {
  return (
    <Home/>
  )
}
