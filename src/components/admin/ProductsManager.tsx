'use client';

import { useState } from 'react';
import type { Produto } from '@/types';
import { useSiteData } from '@/hooks/useSiteData';
import { updateSiteData } from '@/lib/firestore';
import { getCategoryLabel } from '@/data/categories';
import { ProductForm } from './ProductForm';

export function ProductsManager() {
  const { data } = useSiteData();
  const [editing, setEditing] = useState<Produto | null | 'new'>(null);
  const [toast, setToast] = useState('');

  const produtos = data?.produtos ?? [];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const saveProduct = async (produto: Produto) => {
    const updated = editing === 'new'
      ? [...produtos, produto]
      : produtos.map((p) => p.id === produto.id ? produto : p);
    await updateSiteData({ produtos: updated });
    setEditing(null);
    showToast(editing === 'new' ? 'Produto criado com sucesso!' : 'Produto atualizado!');
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Excluir este produto?')) return;
    await updateSiteData({ produtos: produtos.filter((p) => p.id !== id) });
    showToast('Produto excluído.');
  };

  const toggleField = async (id: string, field: 'destaque' | 'visivel') => {
    const updated = produtos.map((p) => p.id === id ? { ...p, [field]: !p[field] } : p);
    await updateSiteData({ produtos: updated });
  };

  if (editing) {
    return (
      <ProductForm
        produto={editing === 'new' ? null : editing}
        onSave={saveProduct}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      {toast && <div className="toast show" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1rem' }}>{toast}</div>}
      <div className="admin-topbar">
        <h2 className="title-serif" style={{ fontSize: '1.8rem' }}>Produtos ({produtos.length})</h2>
        <button className="btn-gold" onClick={() => setEditing('new')}>+ Novo Produto</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Destaque</th>
              <th>Visível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td style={{ color: 'var(--white)' }}>{p.nome}</td>
                <td style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>{getCategoryLabel(p.categoria)}</td>
                <td style={{ color: 'var(--gold)' }}>{p.preco}</td>
                <td>
                  <button
                    onClick={() => toggleField(p.id, 'destaque')}
                    style={{ color: p.destaque ? '#2ecc71' : 'var(--gray)', fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none' }}
                    aria-label={p.destaque ? 'Remover destaque' : 'Adicionar destaque'}
                  >
                    {p.destaque ? '★' : '☆'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => toggleField(p.id, 'visivel')}
                    style={{ color: p.visivel ? '#2ecc71' : '#e74c3c', fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none' }}
                    aria-label={p.visivel ? 'Ocultar produto' : 'Exibir produto'}
                  >
                    {p.visivel ? '● Visível' : '○ Oculto'}
                  </button>
                </td>
                <td>
                  <button className="action-btn" onClick={() => setEditing(p)}>Editar</button>
                  <button className="action-btn" style={{ color: '#e74c3c' }} onClick={() => deleteProduct(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {produtos.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '3rem 0' }}>Nenhum produto cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
