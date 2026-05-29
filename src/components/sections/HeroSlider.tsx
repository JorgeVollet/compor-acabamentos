'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Hero, Assets } from '@/types';

interface HeroSliderProps {
  hero: Hero[];
  assets: Assets;
}

const SLIDE_INTERVAL = 5000;

export function HeroSlider({ hero, assets }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const imgs = [assets.hero0, assets.hero1, assets.hero2, assets.hero3];
  const localImgs = ['/fotoherosetor1.jpeg', '/herosetor2.jpg', '/herosetor3.jpeg', '/herosetor4.png'];

  const slides = hero.length > 0 ? hero : [
    { label: 'Soluções Químicas', title: 'Soluções químicas e de uso profissional.', desc: 'As melhores marcas de impermeabilizantes, tintas, aditivos e acabamentos.', img: '', tag: 'Ambientes Memoráveis', btn: 'Conhecer Produtos' },
    { label: 'Revestimentos', title: 'Revestimentos cerâmicos e porcelanatos', desc: 'Revestimentos cerâmicos, porcelanatos e pedras naturais, para transformar seu ambiente.', img: '', tag: 'Ambientes Memoráveis', btn: 'Ver Catálogo' },
    { label: 'Metais', title: 'Metais que irão definir o padrão de sua cozinha e banheiro', desc: 'Torneiras, acessórios em metal e aquecedores.', img: '', tag: 'Ambientes Memoráveis', btn: 'Ver Metais' },
    { label: 'Compor Home', title: 'Compor Home', desc: 'Um Home Center completo para quem deseja renovar, reformar ou decorar.', img: '', tag: 'Ambientes Memoráveis', btn: 'VER LINHA COMPOR HOME' },
  ];

  const goTo = useCallback((i: number) => setCurrent(i), []);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const t = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [next]);

  const handleCTA = (index: number, btn: string) => {
    if (index === 3) {
      const catalog = document.getElementById('catalogo');
      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' });
        const event = new CustomEvent('filterCategory', { detail: 'compor_home' });
        window.dispatchEvent(event);
      }
    } else if (btn.toLowerCase().includes('catálogo') || btn.toLowerCase().includes('metal')) {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      {slides.map((slide, i) => {
        const imgSrc = (imgs[i] && imgs[i].startsWith('http')) ? imgs[i] : localImgs[i] ?? localImgs[0];
        return (
          <div key={i} className={`slide${i === current ? ' active' : ''}`}>
            <Image
              src={imgSrc}
              alt={slide.label}
              fill
              className="slide-bg"
              style={{ objectFit: 'cover', objectPosition: i === 2 ? 'right center' : 'center' }}
              priority={i === 0}
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
