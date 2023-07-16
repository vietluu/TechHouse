import dynamic from 'next/dynamic';
const Home = dynamic(() => import('@/ui/HomePage'), { ssr: false });

export default function page() {
  return <Home />;
}
