import AboutPage from '@/components/pages/AboutPage';

export const metadata = {
  title: 'About Us | Evershine Car Care Center',
  description:
    'Evershine Car Care Center in Al Khobar offers professional car detailing, ceramic coating, paint protection film and window tinting. Established 2004.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutPage />;
}
