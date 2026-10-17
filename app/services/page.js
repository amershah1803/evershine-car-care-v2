import ServicesPage from '@/components/pages/ServicesPage';

export const metadata = {
  title: 'Services & Packages | Evershine Car Care Center',
  description:
    'Choose your car size and services, request a quote and send your booking details to Evershine Car Care Center in Al Khobar.',
  alternates: { canonical: '/services' },
};

export default function Page() {
  return <ServicesPage />;
}
