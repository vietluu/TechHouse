import ComingSoon from '@/components/ComingSoon';
import { Metadata } from 'next';
import React from 'react';

function page() {
  return <ComingSoon />;
}
export const metadata: Metadata = {
  title: 'Contact',
};
export default page;
