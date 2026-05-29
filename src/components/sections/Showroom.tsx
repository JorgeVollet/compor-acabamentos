'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { Produto } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { useSiteData } from '@/hooks/useSiteData';

interface ShowroomProps {
  initialProdutos: Produto[];
  onProductClick: (produto: Produto) => void;
}

export function Showroom({ initialProdutos, onProductClick }: ShowroomProps) {
  const { data } = useSiteData();
  const produtos = data?.produtos ?? initialProdutos;
  const [search, setSearch] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const destaques = useMemo(() => {
    const q = search.toLowerCase();
    return produtos
      .filter((p) => p.destaque && p.visivel)
      .filter((p) => !q || p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q));
  }, [produtos, search]);

  return (
    <section id="showroom" className="section-padding fade-in" ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">Destaques</span>
        <h2 className="title-serif section-title">Showroom</h2>
        <p className="section-sub">Produtos selecionados pela nossa equipe para transformar seus ambientes.</p>
      </div>

      <div className="search-bar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <input
          type="search"
          placeholder="Buscar produtos em destaque..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar produtos"
        />
      </div>

      {destaques.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '4rem 0' }}>
          {search ? 'Nenhum produto encontrado para sua busca.' : 'Nenhum produto em destaque no momento.'}
        </p>
      ) : (
        <div className="grid-3">
          {destaques.map((p) => (
            <ProductCard key={p.id} produto={p} onClick={onProductClick} />
          ))}
        </div>
      )}
    </section>
  );
}
