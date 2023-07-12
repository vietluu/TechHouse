'use client';
import Header from '@/components/Header';
import '/assets/css/style.css';
import '/assets/css/slick.css';
import '/assets/css/owl.carousel.css';
import 'antd/dist/reset.css';
import '/assets/css/responsive.css';
import Footer from '@/components/Footer';

export default function Template({
  children,
}: {
  children: React.ReactNode;
  }) {
   
  return (
    <>
     {children}  
    </>
  );
}
