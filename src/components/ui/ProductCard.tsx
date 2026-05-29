import type { Produto } from '@/types';
import { getCategoryLabel } from '@/data/categories';
import Image from 'next/image';

interface ProductCardProps {
  produto: Produto;
  onClick: (produto: Produto) => void;
}

export function ProductCard({ produto, onClick }: ProductCardProps) {
  const thumb = produto.fotos[0] ?? '/logocompor2.png';

  return (
    <div className="product-card" onClick={() => onClick(produto)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick(produto)} aria-label={`Ver detalhes de ${produto.nome}`}>
      <div className="card-img-wrap">
        <Image src={thumb} alt={produto.nome} fill className="card-img" sizes="(max-width: 768px) 100vw, 33vw" />
        {produto.badge && <span className="card-badge">{produto.badge}</span>}
        <div className="card-overlay"><span>Ver Produto</span></div>
      </div>
      <div className="card-info">
        <span className="card-cat">{getCategoryLabel(produto.categoria)}</span>
        <h3 className="title-serif card-title">{produto.nome}</h3>
        {produto.specs && <p className="card-specs">{produto.specs}</p>}
        <div className="card-bottom">
          <span className="card-price">{produto.preco}</span>
          <span className="card-link">Ver mais →</span>
        </div>
      </div>
    </div>
  );
}
