'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

type AdminTab = 'dashboard' | 'produtos' | 'loja' | 'aparencia' | 'backup';

interface AdminShellProps {
  children: (activeTab: AdminTab) => React.ReactNode;
}

const TABS: { id: AdminTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'loja', label: 'Configurações da Loja' },
  { id: 'aparencia', label: 'Aparência' },
  { id: 'backup', label: 'Backup' },
];

export function AdminShell({ children }: AdminShellProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { signOut, user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-panel)' }}>
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image src="/logocompor2.png" alt="Compor" width={100} height={40} style={{ objectFit: 'contain' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{user?.email}</span>
          <a href="/" style={{ color: 'var(--gray)', fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase' }}>Ver Site</a>
          <button
            className="btn-outline"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', cursor: 'pointer' }}
            onClick={() => signOut()}
          >
            Sair
          </button>
        </div>
      </div>

      <div className="admin-body" style={{ flex: 1 }}>
        <nav className="admin-sidebar" aria-label="Menu admin">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="admin-content">
          {children(activeTab)}
        </main>
      </div>
    </div>
  );
}
