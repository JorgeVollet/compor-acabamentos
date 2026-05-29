'use client';

import { AdminShell } from '@/components/admin/AdminShell';
import { Dashboard } from '@/components/admin/Dashboard';
import { ProductsManager } from '@/components/admin/ProductsManager';
import { StoreConfig } from '@/components/admin/StoreConfig';
import { AppearanceConfig } from '@/components/admin/AppearanceConfig';
import { BackupManager } from '@/components/admin/BackupManager';

export default function AdminPage() {
  return (
    <AdminShell>
      {(activeTab) => {
        switch (activeTab) {
          case 'dashboard': return <Dashboard />;
          case 'produtos': return <ProductsManager />;
          case 'loja': return <StoreConfig />;
          case 'aparencia': return <AppearanceConfig />;
          case 'backup': return <BackupManager />;
        }
      }}
    </AdminShell>
  );
}
