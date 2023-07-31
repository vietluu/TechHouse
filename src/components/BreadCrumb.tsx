'use client';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

function BreadCrumb({ title }: { title: string }) {
  const breadcrumbData = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/product',
      label: 'Product',
    },
  ];
  const generateBreadcrumbs = () => {
    const router = useRouter();
    const pathname = usePathname();

    const crumbs = breadcrumbData.map((item) => (
      <Breadcrumb.Item key={item.path}>
        <Link href={item.path}>{item.label}</Link>
      </Breadcrumb.Item>
    ));

    crumbs.push(
      <Breadcrumb.Item key={pathname}>
        <span>
          {title ||
            breadcrumbData.find((item) => item.path === pathname)?.label}
        </span>
      </Breadcrumb.Item>
    );

    return crumbs;
  };
  return <Breadcrumb className="pt-2">{generateBreadcrumbs()}</Breadcrumb>;
}

export default BreadCrumb;
