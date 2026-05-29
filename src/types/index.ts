export type CategorySlug =
  | 'ceramicas'
  | 'revestimentos_naturais'
  | 'quimicos'
  | 'tintas'
  | 'vinilicos'
  | 'loucas'
  | 'metais'
  | 'iluminacao'
  | 'compor_home'
  | 'acessorios';

export interface Hero {
  label: string;
  title: string;
  desc: string;
  img: string;
  tag: string;
  btn: string;
}

export interface Produto {
  id: string;
  nome: string;
  categoria: CategorySlug;
  preco: string;
  descricao: string;
  specs: string;
  fotos: string[];
  badge: string;
  destaque: boolean;
  visivel: boolean;
}

export interface LojaUnidade {
  endereco: string;
  whatsapp: string;
  maps: string;
  instagram: string;
}

export interface Loja {
  email: string;
  horario: string;
  tm: LojaUnidade;
  bvb: LojaUnidade;
}

export interface Assets {
  hero0: string;
  hero1: string;
  hero2: string;
  hero3: string;
  logo: string;
  loc: string;
  logoPos: number;
  logoPosX: number;
  logoSize: number;
  logoSubText: string;
  logoSubPosX: number;
  logoSubPosY: number;
}

export interface SiteData {
  hero: Hero[];
  produtos: Produto[];
  loja: Loja;
  assets: Assets;
}

export interface CartItem {
  produto: Produto;
  qty: number;
}
