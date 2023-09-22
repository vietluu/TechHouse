import ComingSoon from '@/components/ComingSoon';
import dynamic from 'next/dynamic';
const Cart = dynamic(() => import('@/ui/Cart'));
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Cart',
};
function page(): React.JSX.Element {
  return <Cart />;
}

export default page;
