import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
export const metadata: Metadata = {
  title: 'TechHouse',
  description: 'Generated by create next app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
