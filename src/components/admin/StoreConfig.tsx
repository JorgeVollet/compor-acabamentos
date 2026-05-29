'use client';

import { useState, useEffect } from 'react';
import type { Loja } from '@/types';
import { useSiteData } from '@/hooks/useSiteData';
import { updateSiteData } from '@/lib/firestore';

export function StoreConfig() {
  const { data } = useSiteData();
  const [form, setForm] = useState<Loja>({ email: '', horario: '', tm: { endereco: '', whatsapp: '', maps: '', instagram: '' }, bvb: { endereco: '', whatsapp: '', maps: '', instagram: '' } });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (data?.loja) setForm(data.loja);
  }, [data]);

  const setNested = (unit: 'tm' | 'bvb', field: string, value: string) => {
    setForm((p) => ({ ...p, [unit]: { ...p[unit], [field]: value } }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteData({ loja: form });
      setToast('Configurações salvas!');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {toast && <div className="toast show" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1rem' }}>{toast}</div>}
      <h2 className="title-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Configurações da Loja</h2>
      <form onSubmit={save}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loja-email">Email de Contato</label>
            <input id="loja-email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label htmlFor="loja-horario">Horário de Funcionamento</label>
            <input id="loja-horario" type="text" placeholder="Seg-Sex 08h-18h | Sáb 08h-12h" value={form.horario} onChange={(e) => setForm((p) => ({ ...p, horario: e.target.value }))} />
          </div>
        </div>

        {(['tm', 'bvb'] as const).map((unit) => (
          <div key={unit} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase' }}>
              Loja {unit.toUpperCase()}
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label>Endereço</label>
                <input type="text" value={form[unit].endereco} onChange={(e) => setNested(unit, 'endereco', e.target.value)} />
              </div>
              <div className="form-group">
                <label>WhatsApp (somente números)</label>
                <input type="text" placeholder="55999999999" value={form[unit].whatsapp} onChange={(e) => setNested(unit, 'whatsapp', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Link Google Maps</label>
                <input type="url" value={form[unit].maps} onChange={(e) => setNested(unit, 'maps', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Link Instagram</label>
                <input type="url" value={form[unit].instagram} onChange={(e) => setNested(unit, 'instagram', e.target.value)} />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="btn-gold" disabled={loading}>
          {loading ? 'Salvando...' : 'SALVAR CONFIGURAÇÕES'}
        </button>
      </form>
    </div>
  );
}
