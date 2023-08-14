import Contact from '@/ui/Contact';
import { Metadata } from 'next';
import React from 'react';

function page() {
  return <Contact />;
}
export const metadata: Metadata = {
  title: 'Contact',
};
export default page;
