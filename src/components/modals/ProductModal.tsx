'use client';

import { useState, useEffect } from 'react';
import type { Produto } from '@/types';
import { getCategoryLabel } from '@/data/categories';
import { cleanFotos } from '@/lib/format';
import { useCart } from '@/hooks/useCart';

interface ProductModalProps {
  produto: Produto | null;
  onClose: () => void;
  lojaWhatsapp?: string;
}

export function ProductModal({ produto, onClose, lojaWhatsapp }: ProductModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImg(0);
    setAdded(false);
  }, [produto]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (produto) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [produto, onClose]);

  useEffect(() => {
    document.body.style.overflow = produto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [produto]);

  if (!produto) return null;

  const imgs = cleanFotos(produto.fotos);
  const displayImgs = imgs.length > 0 ? imgs : ['/logocompor2.png'];
  const currentImg = displayImgs[activeImg] ?? '/logocompor2.png';

  const phone = lojaWhatsapp?.replace(/\D/g, '') ?? '';
  const waMsg = `Olá! Tenho interesse no produto: *${produto.nome}* (${produto.preco}). Poderia me fornecer mais informações?`;
  const waUrl = phone ? `https://wa.me/55${phone}?text=${encodeURIComponent(waMsg)}` : '#';

  const handleAdd = () => {
    addItem(produto);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`modal-overlay${produto ? ' active' : ''}`}
      onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={produto.nome}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>

        <div className="modal-gallery">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImg}
            alt={`${produto.nome} - foto ${activeImg + 1}`}
            className="modal-img-main"
          />
          {displayImgs.length > 1 && (
            <div className="modal-thumbs">
              {displayImgs.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`Miniatura ${i + 1}`}
                  className={`modal-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <span className="modal-cat">{getCategoryLabel(produto.categoria)}</span>
          <h2 className="title-serif modal-title">{produto.nome}</h2>
          <div className="modal-price">{produto.preco}</div>
          {produto.specs && <div className="modal-specs">{produto.specs}</div>}
          {produto.descricao && <p className="modal-desc">{produto.descricao}</p>}
          <div className="modal-actions">
            <button className="btn-gold" style={{ flex: 1 }} onClick={handleAdd}>
              {added ? '✓ Adicionado!' : 'ADICIONAR AO CARRINHO'}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              DÚVIDAS / ORÇAMENTO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
