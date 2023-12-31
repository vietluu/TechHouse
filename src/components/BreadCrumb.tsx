'use client';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const breadcrumbData = [
  {
    path: '/',
    label: 'Trang chủ',
  },
  {
    path: '/product',
    label: 'sản phẩm',
  },
];

function BreadCrumb({ title }: { title: string | any }) {
  const generateBreadcrumbs = () => {
    const router = useRouter();
    const pathname = usePathname();

    const crumbs = breadcrumbData.map((item, index) => (
      <Breadcrumb.Item key={item.path}>
        <Link href={item.path}>{item.label}</Link>
      </Breadcrumb.Item>
    ));

    title &&
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
  return (
    <Breadcrumb style={{ paddingTop: 10 }}>{generateBreadcrumbs()}</Breadcrumb>
  );
}

export default BreadCrumb;
