import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://composacabamentos.com.br', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://composacabamentos.com.br/#showroom', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://composacabamentos.com.br/#catalogo', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://composacabamentos.com.br/#localizacao', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
