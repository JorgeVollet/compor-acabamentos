'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  lojaWhatsapp?: string;
}

export function CartModal({ open, onClose, lojaWhatsapp }: CartModalProps) {
  const { items, removeItem, updateQty, clearCart, getTotalPrice } = useCart();
  const phone = lojaWhatsapp?.replace(/\D/g, '') ?? '';

  const sendWhatsApp = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => `- ${i.produto.nome} (x${i.qty}) — ${i.produto.preco}`).join('\n');
    const msg = `Olá! Tenho interesse nos seguintes produtos:\n\n${lines}\n\nTotal estimado: ${getTotalPrice()}`;
    const url = phone ? `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}` : '#';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`modal-overlay${open ? ' active' : ''}`}
      onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho de compras"
    >
      <div className="modal-content" style={{ maxWidth: 500, display: 'block', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar carrinho">×</button>
        <h2 className="title-serif" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Seu Carrinho</h2>

        {items.length === 0 ? (
          <p style={{ color: 'var(--gray)', textAlign: 'center', padding: '2rem 0' }}>Seu carrinho está vazio.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.produto.id} className="cart-item">
                <div style={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
                  <Image
                    src={item.produto.fotos[0] ?? '/logocompor2.png'}
                    alt={item.produto.nome}
                    fill
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.produto.nome}</div>
                  <div className="cart-item-price">{item.produto.preco}</div>
                  <div className="cart-qty-ctrl">
                    <button className="cart-qty-btn" onClick={() => updateQty(item.produto.id, item.qty - 1)} aria-label="Diminuir quantidade">−</button>
                    <span style={{ color: 'var(--white)', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.produto.id, item.qty + 1)} aria-label="Aumentar quantidade">+</button>
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeItem(item.produto.id)} aria-label={`Remover ${item.produto.nome}`}>Remover</button>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Total estimado:</span>
              <span style={{ color: 'var(--gold)', fontSize: '1.2rem', fontFamily: 'var(--font-title)' }}>{getTotalPrice()}</span>
            </div>

            <button className="btn-gold" style={{ width: '100%', marginBottom: '0.8rem', textAlign: 'center' }} onClick={sendWhatsApp}>
              ENVIAR PEDIDO PARA WHATSAPP
            </button>
            <button className="btn-outline" style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }} onClick={() => { clearCart(); onClose(); }}>
              Limpar Carrinho
            </button>
          </>
        )}
      </div>
    </div>
  );
}
