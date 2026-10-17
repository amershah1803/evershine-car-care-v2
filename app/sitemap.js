const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const ROUTES = ['/', '/about', '/services', '/work', '/branches', '/contact'];

export default function sitemap() {
  return ROUTES.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
