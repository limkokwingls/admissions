import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Limkokwing Admissions',
  description:
    '2025/2026 First Year Admissions, Limkokwing University of Creative Technology Lesotho',
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    title: 'Limkokwing University Admissions 2025/2026',
    description:
      'Official list of 2025/2026 First Year Admitted Students at Limkokwing University of Creative Technology Lesotho',
    url: 'https://luctintake.vercel.app',
    siteName: 'Limkokwing University Lesotho',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Limkokwing University Admissions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limkokwing University Admissions 2025/2026',
    description:
      'Official list of 2025/2026 First Year Admitted Students at Limkokwing University of Creative Technology Lesotho',
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
