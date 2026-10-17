import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Evershine Car Care Center',
  description:
    'Evershine Car Care Center in Al Khobar, Saudi Arabia. Professional detailing, ceramic coating, paint protection film and window tinting. Trusted since 2004.',
  openGraph: {
    type: 'website',
    siteName: 'Evershine Car Care Center',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    images: ['/assets/images/hero/hero-sunset-desktop.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
