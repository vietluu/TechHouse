import ComingSoon from '@/components/ComingSoon';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
};
function page() {
  return <ComingSoon />;
}

export default page;
