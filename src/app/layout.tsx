import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import '/assets/css/reset.css';
import FacebookChat from '@/components/FacebookChat';

const DynamicReduxProvider = dynamic(() => import('@/redux/Provider'));

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
          {children}
          <FacebookChat />
        </DynamicReduxProvider>
      </body>
    </html>
  );
}
