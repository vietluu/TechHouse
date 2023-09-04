import About from '@/ui/About';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
};
function page() {
  return <About />;
}

export default page;
