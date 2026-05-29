'use client';

import { useState } from 'react';
import type { Produto } from '@/types';
import { useSiteData } from '@/hooks/useSiteData';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { BackToTop } from '@/components/layout/BackToTop';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { Features } from '@/components/sections/Features';
import { Showroom } from '@/components/sections/Showroom';
import { Catalog } from '@/components/sections/Catalog';
import { CTAContact } from '@/components/sections/CTAContact';
import { Reviews } from '@/components/sections/Reviews';
import { Location } from '@/components/sections/Location';
import { ProductModal } from '@/components/modals/ProductModal';
import { CartModal } from '@/components/modals/CartModal';

export default function HomePage() {
  const { data } = useSiteData();
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const hero = data?.hero ?? [];
  const produtos = data?.produtos ?? [];
  const loja = data?.loja ?? { email: '', horario: '', tm: { endereco: '', whatsapp: '', maps: '', instagram: '' }, bvb: { endereco: '', whatsapp: '', maps: '', instagram: '' } };
  const assets = data?.assets ?? { hero0: '', hero1: '', hero2: '', hero3: '', logo: '', loc: '', logoPos: 0, logoPosX: 0, logoSize: 70, logoSubText: '', logoSubPosX: 0, logoSubPosY: 0 };

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <HeroSlider hero={hero} assets={assets} />
      <Features />
      <Showroom initialProdutos={produtos} onProductClick={setSelectedProduto} />
      <CTAContact tm={loja.tm} />
      <Catalog initialProdutos={produtos} onProductClick={setSelectedProduto} />
      <Reviews />
      <Location loja={loja} />
      <Footer loja={loja} assets={assets} />
      <WhatsAppFloat tm={loja.tm} />
      <BackToTop />
      <ProductModal produto={selectedProduto} onClose={() => setSelectedProduto(null)} lojaWhatsapp={loja.tm?.whatsapp} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} lojaWhatsapp={loja.tm?.whatsapp} />
    </>
  );
}
