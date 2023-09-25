import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import '/assets/css/reset.css';
import StyledComponentsRegistry from '@/lib/StyleAntd';
import { Analytics } from '@vercel/analytics/react';

const DynamicReduxProvider = dynamic(() => import('@/redux/Provider'));
const FacebookChat = dynamic(() => import('@/components/FacebookChat'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <DynamicReduxProvider>
          <NextTopLoader color="green" />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <FacebookChat />
        </DynamicReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
