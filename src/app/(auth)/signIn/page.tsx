import dynamic from 'next/dynamic';
const SignIn = dynamic(() => import('@/ui/Auth/SignIn'), { ssr: true });

import React from 'react';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};
function page({ params, searchParams }: Props) {
  return <SignIn callback={searchParams.callbackUrl} />;
}

export default page;
