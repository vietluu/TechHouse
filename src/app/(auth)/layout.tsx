import { Metadata } from 'next';
import '/assets/css/SignIn.css';
import 'antd/dist/reset.css';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'TechHouse',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
