import dynamic from 'next/dynamic';
import NextTopLoader from 'nextjs-toploader';
import { Be_Vietnam_Pro } from 'next/font/google';
import '/assets/css/reset.css';
import '/assets/scss/style.scss';
import StyledComponentsRegistry from '@/lib/StyleAntd';
import { Analytics } from '@vercel/analytics/react';
import process from 'process';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

const DynamicReduxProvider = dynamic(() => import('@/redux/Provider'));
const FacebookChat = dynamic(() => import('@/components/FacebookChat'), {
  ssr: false,
});

import { I18nProvider } from '@/context/I18nContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className={`${beVietnamPro.className} max-w-[1920px] mx-auto antialiased bg-slate-50 text-slate-800`}>
        <I18nProvider>
          <DynamicReduxProvider>
            <NextTopLoader color="#0284c7" height={3} showSpinner={false} />
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            <FacebookChat />
          </DynamicReduxProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
