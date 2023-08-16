import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import '/assets/css/reset.css';
import StyledComponentsRegistry from '@/lib/StyleAntd';

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
    <html lang="en">
      <body>
        <DynamicReduxProvider>
          <NextTopLoader color="#fff" />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <FacebookChat />
        </DynamicReduxProvider>
      </body>
    </html>
  );
}
