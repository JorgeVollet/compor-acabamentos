'use client';

import { useSiteData } from '@/hooks/useSiteData';

export function Dashboard() {
  const { data } = useSiteData();
  const produtos = data?.produtos ?? [];

  const stats = [
    { label: 'Total de Produtos', value: produtos.length },
    { label: 'Produtos Visíveis', value: produtos.filter((p) => p.visivel).length },
    { label: 'Em Destaque', value: produtos.filter((p) => p.destaque).length },
    { label: 'Ocultos', value: produtos.filter((p) => !p.visivel).length },
  ];

  return (
    <div>
      <h2 className="title-serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: '2.5rem', color: 'var(--gold)' }}>{s.value}</div>
            <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase' }}>Últimos Produtos Adicionados</h3>
        {produtos.slice(-5).reverse().map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--white)' }}>{p.nome}</span>
            <span style={{ color: 'var(--gold)' }}>{p.preco}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
