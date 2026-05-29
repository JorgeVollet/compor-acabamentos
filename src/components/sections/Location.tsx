'use client';

import { useEffect, useRef } from 'react';
import type { Loja } from '@/types';

interface LocationProps {
  loja: Loja;
}

interface StoreCardProps {
  name: string;
  city: string;
  data: { endereco: string; whatsapp: string; maps: string; instagram: string };
  img: string;
  alt: string;
  showDivider?: boolean;
}

function StoreCard({ name, city, data, img, alt, showDivider }: StoreCardProps) {
  const phone = (data.whatsapp || '').replace(/\D/g, '');
  const waUrl = phone
    ? `https://wa.me/55${phone}?text=${encodeURIComponent(
        'Olá! Gostaria de mais informações sobre os produtos da Compor Acabamentos.'
      )}`
    : '#';

  return (
    <div className="store-card">
      {showDivider && <div className="store-divider" aria-hidden="true" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={alt} className="store-card-img" loading="lazy" />
      <div className="store-card-overlay">
        <span className="store-card-city">{city}</span>
        <h3 className="store-card-name">{name}</h3>
        {data.endereco && <p className="store-card-address">{data.endereco}</p>}
        <div className="store-card-actions">
          {data.maps && (
            <a href={data.maps} target="_blank" rel="noopener noreferrer" className="btn-dark">
              📍 VER NO MAPA
            </a>
          )}
          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="btn-dark">
              📸 INSTAGRAM
            </a>
          )}
          {data.whatsapp && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">
              💬 WHATSAPP
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Location({ loja }: LocationProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="localizacao" className="location-section fade-in">
      <div className="location-section-header">
        <span className="section-label">Localização</span>
        <h2 className="title-serif section-title">Nossas Lojas</h2>
        <p className="section-sub">
          Duas unidades para melhor atendê-lo no Rio Grande do Sul.
        </p>
      </div>

      <div className="location-stores-grid">
        <StoreCard
          name="Três de Maio"
          city="Rio Grande do Sul"
          data={loja.tm ?? { endereco: '', whatsapp: '', maps: '', instagram: '' }}
          img="/fachadatm.webp"
          alt="Fachada Três de Maio"
          showDivider
        />
        <StoreCard
          name="Boa Vista do Buricá"
          city="Rio Grande do Sul"
          data={loja.bvb ?? { endereco: '', whatsapp: '', maps: '', instagram: '' }}
          img="/fachadabvb.webp"
          alt="Fachada Boa Vista do Buricá"
        />
      </div>

      {loja.horario && (
        <div className="loc-info">
          <p>{loja.horario}</p>
        </div>
      )}
    </section>
  );
}
