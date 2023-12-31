import dynamic from 'next/dynamic';
import React from 'react';
const SignIn = dynamic(() => import('@/ui/Auth/SignIn'), { ssr: false });

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};
function page({ params, searchParams }: Props) {
  return <SignIn callback={searchParams.callbackUrl} />;
}

export default page;
