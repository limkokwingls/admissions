import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Limkokwing Admissions',
  description: '2025/2026 Fist Year Limkokwing Admissions',
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    images: [
      {
        url: '/images/logo.png',
        width: 1371,
        height: 691,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body>
          <>{children}</>
        </body>
      </html>
    </html>
  );
}
