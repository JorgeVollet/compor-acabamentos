'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { SiteData } from '@/types';
import { subscribeSiteData } from '@/lib/firestore';

interface SiteDataContextValue {
  data: SiteData | null;
  loading: boolean;
}

const SiteDataContext = createContext<SiteDataContextValue>({ data: null, loading: true });

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeSiteData((d) => {
      setData(d);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteDataContext(): SiteDataContextValue {
  return useContext(SiteDataContext);
}
