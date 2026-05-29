'use client';

import { useState } from 'react';
import type { Produto, CategorySlug } from '@/types';
import { CATEGORIES } from '@/data/categories';
import { generateId } from '@/lib/format';

interface ProductFormProps {
  produto?: Produto | null;
  onSave: (produto: Produto) => Promise<void>;
  onCancel: () => void;
}

const BADGES = ['', 'TOP VENDA', 'DESTAQUE', 'LANÇAMENTO', 'NOVIDADE', 'EXCLUSIVO'];

export function ProductForm({ produto, onSave, onCancel }: ProductFormProps) {
  const isNew = !produto;
  const [form, setForm] = useState<Produto>({
    id: produto?.id ?? generateId(),
    nome: produto?.nome ?? '',
    categoria: produto?.categoria ?? 'ceramicas',
    preco: produto?.preco ?? '',
    descricao: produto?.descricao ?? '',
    specs: produto?.specs ?? '',
    fotos: produto?.fotos ?? [],
    badge: produto?.badge ?? '',
    destaque: produto?.destaque ?? false,
    visivel: produto?.visivel ?? true,
  });
  const [fotosInput, setFotosInput] = useState((produto?.fotos ?? []).join('\n'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof Produto, value: unknown) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim()) { setError('Nome é obrigatório.'); return; }
    if (!form.preco.trim()) { setError('Preço é obrigatório.'); return; }
    setLoading(true);
    setError('');
    try {
      const fotos = fotosInput.split('\n').map((u) => u.trim()).filter(Boolean);
      await onSave({ ...form, fotos });
    } catch (err: unknown) {
      setError((err as Error).message ?? 'Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-topbar">
        <h2 className="title-serif" style={{ fontSize: '1.8rem' }}>{isNew ? 'Novo Produto' : 'Editar Produto'}</h2>
        <button className="btn-outline" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }} onClick={onCancel}>Cancelar</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="p-nome">Nome *</label>
            <input id="p-nome" type="text" value={form.nome} onChange={(e) => set('nome', e.target.value)} required />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="p-preco">Preço *</label>
            <input id="p-preco" type="text" placeholder="R$ 0,00/m²" value={form.preco} onChange={(e) => set('preco', e.target.value)} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="p-cat">Categoria *</label>
            <select id="p-cat" value={form.categoria} onChange={(e) => set('categoria', e.target.value as CategorySlug)}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="p-badge">Badge</label>
            <select id="p-badge" value={form.badge} onChange={(e) => set('badge', e.target.value)}>
              {BADGES.map((b) => <option key={b} value={b}>{b || '— Nenhum —'}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="p-specs">Especificações</label>
          <input id="p-specs" type="text" placeholder="Ex: 60x60cm | Rectificado | PEI 4" value={form.specs} onChange={(e) => set('specs', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="p-desc">Descrição</label>
          <textarea id="p-desc" rows={4} value={form.descricao} onChange={(e) => set('descricao', e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="p-fotos">URLs das Fotos (uma por linha)</label>
          <textarea id="p-fotos" rows={4} value={fotosInput} onChange={(e) => setFotosInput(e.target.value)} placeholder="https://..." />
        </div>
        <div className="form-row">
          <div className="checkbox-group">
            <input type="checkbox" id="p-destaque" checked={form.destaque} onChange={(e) => set('destaque', e.target.checked)} />
            <label htmlFor="p-destaque" style={{ textTransform: 'none', fontSize: '0.9rem', color: 'var(--white)' }}>Exibir no Showroom (destaque)</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="p-visivel" checked={form.visivel} onChange={(e) => set('visivel', e.target.checked)} />
            <label htmlFor="p-visivel" style={{ textTransform: 'none', fontSize: '0.9rem', color: 'var(--white)' }}>Produto visível ao público</label>
          </div>
        </div>
        {error && <p style={{ color: '#e74c3c', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}
        <button type="submit" className="btn-gold" disabled={loading}>
          {loading ? 'Salvando...' : isNew ? 'CRIAR PRODUTO' : 'SALVAR ALTERAÇÕES'}
        </button>
      </form>
    </div>
  );
}
