'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { Produto } from '@/types';
import type { CategorySlug } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ui/ProductCard';
import { useSiteData } from '@/hooks/useSiteData';

const PAGE_SIZE = 8;

interface CatalogProps {
  initialProdutos: Produto[];
  onProductClick: (produto: Produto) => void;
}

export function Catalog({ initialProdutos, onProductClick }: CatalogProps) {
  const { data } = useSiteData();
  const produtos = data?.produtos ?? initialProdutos;

  const [activeFilter, setActiveFilter] = useState<CategorySlug | 'all'>('all');
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleFilterEvent = useCallback((e: Event) => {
    const slug = (e as CustomEvent<string>).detail as CategorySlug;
    setActiveFilter(slug);
    setPage(1);
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  useEffect(() => {
    window.addEventListener('filterCategory', handleFilterEvent);
    return () => window.removeEventListener('filterCategory', handleFilterEvent);
  }, [handleFilterEvent]);

  const filtered = useMemo(() => {
    return produtos.filter((p) => p.visivel && (activeFilter === 'all' || p.categoria === activeFilter));
  }, [produtos, activeFilter]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const changeFilter = (slug: CategorySlug | 'all') => {
    setActiveFilter(slug);
    setPage(1);
  };

  return (
    <section id="catalogo" className="section-padding fade-in" style={{ background: 'var(--bg-panel)' }} ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">Catálogo</span>
        <h2 className="title-serif section-title">Nossos Produtos</h2>
        <p className="section-sub">Explore nossa linha completa de acabamentos e revestimentos.</p>
      </div>

      <div className="filters" role="group" aria-label="Filtrar por categoria">
        <button
          className={`filter-btn${activeFilter === 'all' ? ' active' : ''}`}
          onClick={() => changeFilter('all')}
        >
          TODOS
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            className={`filter-btn${activeFilter === cat.slug ? ' active' : ''}`}
            onClick={() => changeFilter(cat.slug)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '4rem 0' }}>
          Nenhum produto encontrado nessa categoria.
        </p>
      ) : (
        <div className="grid-3">
          {visible.map((p) => (
            <ProductCard key={p.id} produto={p} onClick={onProductClick} />
          ))}
        </div>
      )}

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn-outline" style={{ display: 'inline-block', cursor: 'pointer' }} onClick={() => setPage((p) => p + 1)}>
            Ver Mais Produtos ({filtered.length - visible.length} restantes)
          </button>
        </div>
      )}
    </section>
  );
}
