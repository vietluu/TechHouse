import dynamic from 'next/dynamic';
const Home = dynamic(() => import('@/ui/HomePage'), { ssr: true });

export default function page() {
  return <Home />;
}
