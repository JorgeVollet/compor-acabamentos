'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Hero, Assets } from '@/types';

interface HeroSliderProps {
  hero: Hero[];
  assets: Assets;
}

const SLIDE_INTERVAL = 5000;

const LOCAL_IMGS = [
  '/fotoherosetor1.jpeg',
  '/herosetor2.jpg',
  '/herosetor3.jpeg',
  '/herosetor4.png',
];

const DEFAULT_HERO: Hero[] = [
  {
    label: 'Soluções Químicas',
    title: 'Soluções químicas e de uso profissional.',
    desc: 'As melhores marcas de impermeabilizantes, tintas, aditivos e acabamentos. Uma linha completa para o setor da construção civil com a melhor consultoria técnica do início ao fim da sua obra.',
    img: 'img/fotoherosetor1.jpeg',
    tag: 'Ambientes Memoráveis',
    btn: 'Conhecer Produtos',
  },
  {
    label: 'Revestimentos',
    title: 'Revestimentos cerâmicos e porcelanatos',
    desc: 'Revestimentos cerâmicos, porcelanatos e pedras naturais, para transformar seu ambiente.',
    img: 'img/herosetor2.jpg',
    tag: 'Ambientes Memoráveis',
    btn: 'Ver Catálogo',
  },
  {
    label: 'Acessórios em Metais',
    title: 'Metais que irão definir o padrão de sua cozinha e banheiro',
    desc: 'Torneiras, acessórios em metal e aquecedores. Uma seleção de duchas elétricas, híbridas e frias.',
    img: 'img/herosetor3.jpeg',
    tag: 'Ambientes Memoráveis',
    btn: 'Ver Metais',
  },
  {
    label: 'Compor Home',
    title: 'Compor Home',
    desc: 'Um Home Center completo para quem deseja renovar, reformar ou decorar. Aqui você encontra tudo em um só lugar com um espaço acolhedor, para você sentir-se em CASA, sempre com inovações e tendências nas melhores marcas.',
    img: 'img/herosetor4.png',
    tag: 'Ambientes Memoráveis',
    btn: 'VER LINHA COMPOR HOME',
  },
];

function resolveSlideImage(index: number, slide: Hero | undefined, assets: Assets): string {
  // Prioridade 1: hero[i].img (fotos reais da loja no Firestore)
  if (slide?.img && slide.img.trim() !== '') {
    const img = slide.img.trim();
    if (img.startsWith('img/')) return '/' + img.substring(4);
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return '/' + img;
  }

  // Prioridade 2: imagens locais em /public (sempre disponíveis)
  if (LOCAL_IMGS[index]) return LOCAL_IMGS[index];

  // Prioridade 3: assets.heroX (URLs Unsplash defaults do Firestore)
  const assetKey = `hero${index}` as keyof Assets;
  const fromAssets = assets[assetKey];
  if (typeof fromAssets === 'string' && fromAssets.trim() !== '') return fromAssets;

  return LOCAL_IMGS[0];
}

export function HeroSlider({ hero, assets }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const slides = hero && hero.length > 0 ? hero : DEFAULT_HERO;

  const goTo = useCallback((i: number) => setCurrent(i), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [next]);

  const handleCTA = (index: number, btn: string) => {
    if (index === 3 || btn.toLowerCase().includes('home')) {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('filterCategory', { detail: 'compor_home' }));
      }, 400);
    } else if (btn.toLowerCase().includes('catálogo') || btn.toLowerCase().includes('metal')) {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      {slides.map((slide, i) => {
        const imgSrc = resolveSlideImage(i, slide, assets);
        return (
          <div key={i} className={`slide${i === current ? ' active' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={slide.label}
              className="slide-bg"
              style={{ objectPosition: i === 2 ? 'right center' : 'center' }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="slide-overlay" />
            <div className="slide-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="title-serif hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.desc}</p>
              <button className="btn-gold" onClick={() => handleCTA(i, slide.btn)}>
                {slide.btn}
              </button>
            </div>
          </div>
        );
      })}

      <div className="hero-arrows">
        <button className="arrow-btn" onClick={prev} aria-label="Slide anterior">←</button>
        <button className="arrow-btn" onClick={next} aria-label="Próximo slide">→</button>
      </div>

      <div className="hero-controls">
        {slides.map((slide, i) => (
          <span
            key={i}
            className={`hero-label${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goTo(i)}
          >
            {slide.label}
          </span>
        ))}
      </div>
    </section>
  );
}
