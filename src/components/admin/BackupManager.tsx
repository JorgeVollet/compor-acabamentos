'use client';

import { useRef, useState } from 'react';
import type { SiteData } from '@/types';
import { useSiteData } from '@/hooks/useSiteData';
import { updateSiteData } from '@/lib/firestore';

export function BackupManager() {
  const { data } = useSiteData();
  const fileRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState({ msg: '', error: false });

  const showToast = (msg: string, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast({ msg: '', error: false }), 4000);
  };

  const exportBackup = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify({ version: '1.0', date: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_compor_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exportado com sucesso!');
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        const importData: SiteData = json.data ?? json;
        if (!confirm(`Importar backup de ${json.date ?? 'data desconhecida'}?\n\nAVISO: Os dados atuais serão SUBSTITUÍDOS. Esta ação não pode ser desfeita.`)) return;
        await updateSiteData(importData);
        showToast('Backup importado com sucesso!');
      } catch {
        showToast('Arquivo inválido ou corrompido.', true);
      } finally {
        if (fileRef.current) fileRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {toast.msg && (
        <div className="toast show" style={{ position: 'relative', top: 0, right: 0, marginBottom: '1rem', background: toast.error ? '#e74c3c' : '#2ecc71' }}>
          {toast.msg}
        </div>
      )}
      <h2 className="title-serif" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Backup de Dados</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Exportar Backup</h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Baixa um arquivo JSON com todos os dados do site (produtos, hero, loja e configurações).
          </p>
          <button className="btn-gold" onClick={exportBackup} disabled={!data}>
            Exportar Backup
          </button>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 8, border: '1px solid rgba(201,68,68,0.3)' }}>
          <h3 style={{ color: '#e74c3c', marginBottom: '1rem' }}>Importar Backup</h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: 1.6 }}>
            <strong style={{ color: '#e74c3c' }}>ATENÇÃO:</strong> Importar um backup vai SUBSTITUIR todos os dados atuais. Esta ação não pode ser desfeita.
          </p>
          <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
            Exporte um backup antes de importar!
          </p>
          <input ref={fileRef} type="file" accept=".json" onChange={importBackup} style={{ display: 'none' }} id="backup-file" />
          <label htmlFor="backup-file" className="btn-outline" style={{ display: 'inline-block', cursor: 'pointer', padding: '1rem 2rem', borderRadius: 2, textAlign: 'center', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase' }}>
            Selecionar Arquivo
          </label>
        </div>
      </div>
    </div>
  );
}
