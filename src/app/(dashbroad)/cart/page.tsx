import ComingSoon from '@/components/ComingSoon';
import Cart from '@/ui/Cart';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Cart',
};
function page(): React.JSX.Element {
  return <Cart />;
}

export default page;
