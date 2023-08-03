import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
const SignIn = dynamic(() => import('@/ui/Auth/SignIn'), { ssr: false });
import React from 'react';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};
function page({ params, searchParams }: Props) {
  return <SignIn callback={searchParams.callbackUrl} />;
}

export default page;
