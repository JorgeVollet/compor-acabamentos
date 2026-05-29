'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { hidden, scrolled } = useScrollDirection();
  const { getTotalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const count = getTotalCount();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={[hidden ? 'header-hidden' : '', scrolled ? 'scrolled' : ''].filter(Boolean).join(' ')}>
        <div className="logo-container">
          <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image src="/logocompor2.png" alt="Compor Acabamentos" width={140} height={70} style={{ maxHeight: 70, width: 'auto', objectFit: 'contain' }} priority />
          </a>
        </div>
        <nav className={`nav-links${menuOpen ? ' active' : ''}`} id="navLinks">
          <a href="#inicio" onClick={closeMenu}>Início</a>
          <a href="#showroom" onClick={closeMenu}>Showroom</a>
          <a href="#catalogo" onClick={closeMenu}>Catálogo</a>
          <a href="#localizacao" onClick={closeMenu}>Localização</a>
          <a href="#footer" onClick={closeMenu}>Contato</a>
          <button
            onClick={() => { closeMenu(); onCartClick(); }}
            style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}
            aria-label={`Carrinho — ${count} item(s)`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span style={{ background: 'var(--gold)', color: '#000', fontSize: '0.75rem', fontWeight: 600, padding: '2px 6px', borderRadius: 10 }}>{count}</span>
          </button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((p) => !p)} aria-label="Abrir menu" aria-expanded={menuOpen}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 89 }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
