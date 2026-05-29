import type { CategorySlug } from '@/types';

export interface Category {
  slug: CategorySlug;
  label: string;
  labelSingular: string;
  description: string;
  order: number;
}

export const CATEGORIES: Category[] = [
  { slug: 'ceramicas', label: 'CERÂMICAS E PORCELANATOS', labelSingular: 'Cerâmica / Porcelanato', description: 'Pisos e revestimentos cerâmicos e porcelanatos de alto padrão', order: 1 },
  { slug: 'revestimentos_naturais', label: 'REVESTIMENTOS NATURAIS', labelSingular: 'Revestimento Natural', description: 'Pedras naturais, mármore, granito e demais revestimentos naturais', order: 2 },
  { slug: 'quimicos', label: 'QUÍMICOS E USO PROFISSIONAL', labelSingular: 'Químico', description: 'Impermeabilizantes, aditivos, rejuntes e produtos de uso profissional', order: 3 },
  { slug: 'tintas', label: 'TINTAS E ACABAMENTO', labelSingular: 'Tinta', description: 'Tintas, vernizes e produtos de acabamento das melhores marcas', order: 4 },
  { slug: 'vinilicos', label: 'PISOS VINÍLICOS E LAMINADOS', labelSingular: 'Piso Vinílico', description: 'Pisos vinílicos, laminados e emborrachados para ambientes internos', order: 5 },
  { slug: 'loucas', label: 'LOUÇAS SANITÁRIAS', labelSingular: 'Louça Sanitária', description: 'Pias, cubas, bacias e demais louças sanitárias', order: 6 },
  { slug: 'metais', label: 'METAIS', labelSingular: 'Metal', description: 'Torneiras, chuveiros, registros e acessórios em metal', order: 7 },
  { slug: 'iluminacao', label: 'ILUMINAÇÃO', labelSingular: 'Iluminação', description: 'Luminárias, spots, fitas LED e soluções de iluminação', order: 8 },
  { slug: 'compor_home', label: 'COMPOR HOME', labelSingular: 'Compor Home', description: 'Linha completa para decoração e reforma do seu lar', order: 9 },
  { slug: 'acessorios', label: 'ACESSÓRIOS', labelSingular: 'Acessório', description: 'Acessórios para banheiro, cozinha e demais ambientes', order: 10 },
];

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryLabel(slug: CategorySlug): string {
  return getCategoryBySlug(slug)?.label ?? slug;
}

export function getAllCategorySlugs(): CategorySlug[] {
  return CATEGORIES.map((c) => c.slug);
}
