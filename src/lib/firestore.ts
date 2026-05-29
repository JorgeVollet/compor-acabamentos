import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { SiteData } from '@/types';

const SITE_REF = () => doc(db, 'site', 'compor');

const DEFAULT_SITE_DATA: SiteData = {
  hero: [],
  produtos: [],
  loja: {
    email: '',
    horario: '',
    tm: { endereco: '', whatsapp: '', maps: '', instagram: '' },
    bvb: { endereco: '', whatsapp: '', maps: '', instagram: '' },
  },
  assets: {
    hero0: '', hero1: '', hero2: '', hero3: '',
    logo: '', loc: '',
    logoPos: 0, logoPosX: 0, logoSize: 70,
    logoSubText: '', logoSubPosX: 0, logoSubPosY: 0,
  },
};

export async function getSiteData(): Promise<SiteData> {
  const snap = await getDoc(SITE_REF());
  if (!snap.exists()) return DEFAULT_SITE_DATA;
  return snap.data() as SiteData;
}

export async function updateSiteData(data: Partial<SiteData>): Promise<void> {
  await setDoc(SITE_REF(), data, { merge: true });
}

export function subscribeSiteData(callback: (data: SiteData) => void): () => void {
  return onSnapshot(SITE_REF(), (snap) => {
    if (snap.exists()) {
      callback(snap.data() as SiteData);
    } else {
      callback(DEFAULT_SITE_DATA);
    }
  });
}
