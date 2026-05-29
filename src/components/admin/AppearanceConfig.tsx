'use client';

import { useState, useEffect } from 'react';
import type { Assets, Hero } from '@/types';
import { useSiteData } from '@/hooks/useSiteData';
import { updateSiteData } from '@/lib/firestore';

export function AppearanceConfig() {
  const { data } = useSiteData();
  const [assets, setAssets] = useState<Assets>({ hero0: '', hero1: '', hero2: '', hero3: '', logo: '', loc: '', logoPos: 0, logoPosX: 0, logoSize: 70, logoSubText: '', logoSubPosX: 0, logoSubPosY: 0 });
  const [hero, setHero] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (data?.assets) setAssets(data.assets);
    if (data?.hero) setHero(data.hero);
  }, [data]);

  const setA = (field: keyof Assets, value: string | number) => setAssets((p) => ({ ...p, [field]: value }));
  const setHeroField = (i: number, field: keyof Hero, value: string) => {
    setHero((prev) => prev.map((h, idx) => idx === i ? { ...h, [field]: value } : h));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteData({ assets, hero });
      setToast('Aparência salva!');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const heroKeys: (keyof Assets)[] = ['hero0', 'hero1', 'hero2', 'hero3'];

  return (
    <div>
      {toast && <div className="toast show" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1rem' }}>{toast}</div>}
      <h2 className="title-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Aparência do Site</h2>
      <form onSubmit={save}>
        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase' }}>Imagens do Hero (URLs)</h3>
          <div className="form-row" style={{ flexWrap: 'wrap' }}>
            {heroKeys.map((key, i) => (
              <div key={key} className="form-group" style={{ minWidth: 200 }}>
                <label>Slide {i + 1}</label>
                <input type="url" value={String(assets[key])} onChange={(e) => setA(key, e.target.value)} placeholder="https://..." />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase' }}>Logo</h3>
          <div className="form-group">
            <label>URL da Logo</label>
            <input type="url" value={assets.logo} onChange={(e) => setA('logo', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        {hero.length > 0 && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase' }}>Textos dos Slides</h3>
            {hero.map((h, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--gray)', fontSize: '0.8rem', marginBottom: '0.8rem' }}>SLIDE {i + 1}</p>
                <div className="form-row">
                  <div className="form-group">
                    <label>Label</label>
                    <input type="text" value={h.label} onChange={(e) => setHeroField(i, 'label', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Botão</label>
                    <input type="text" value={h.btn} onChange={(e) => setHeroField(i, 'btn', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Título</label>
                  <input type="text" value={h.title} onChange={(e) => setHeroField(i, 'title', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea rows={2} value={h.desc} onChange={(e) => setHeroField(i, 'desc', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="btn-gold" disabled={loading}>
          {loading ? 'Salvando...' : 'SALVAR APARÊNCIA'}
        </button>
      </form>
    </div>
  );
}
