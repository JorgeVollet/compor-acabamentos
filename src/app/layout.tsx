import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { SiteDataProvider } from '@/context/SiteDataContext';
import { getSiteData } from '@/lib/firestore';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Compor Acabamentos — Pisos, Porcelanatos e Revestimentos de Alto Padrão em Horizontina RS',
  description: 'Compor Acabamentos em Horizontina RS. Pisos, porcelanatos, revestimentos, torneiras, pias, chuveiros e produtos para piscina. Mais de 500 produtos em estoque. Atendimento especializado.',
  keywords: 'porcelanato Horizontina, piso Horizontina, revestimento RS, torneira gourmet, acabamentos alto padrão, loja de pisos RS',
  openGraph: {
    title: 'Compor Acabamentos — Alto Padrão para Seus Ambientes',
    description: 'Acabamentos selecionados, qualidade premium e atendimento especializado em Horizontina RS.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Compor Acabamentos',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://composacabamentos.com.br' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteData = await getSiteData();

  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/autography" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/0b9725ed798decbd77f9ba37742ba578?family=blemo" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'var(--font-body)' }}>
        <AuthProvider>
          <SiteDataProvider initial={siteData}>
            <CartProvider>
              {children}
            </CartProvider>
          </SiteDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
