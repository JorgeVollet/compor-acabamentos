import type { Loja, Assets } from '@/types';
import Image from 'next/image';

interface FooterProps {
  loja: Loja;
  assets: Assets;
}

export function Footer({ loja, assets }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo title-serif">
            {assets.logo ? (
              <Image src={assets.logo} alt="Compor Acabamentos" width={160} height={60} style={{ objectFit: 'contain' }} />
            ) : (
              <Image src="/logocompor2.png" alt="Compor Acabamentos" width={160} height={60} style={{ objectFit: 'contain' }} />
            )}
          </div>
          <span className="footer-sub">Acabamentos de Alto Padrão</span>
          <p className="footer-desc">
            Há mais de 25 anos transformando ambientes com produtos de qualidade e atendimento especializado em Horizontina/RS.
          </p>
        </div>
        <div>
          <h4 className="footer-title">Navegação</h4>
          <ul className="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#showroom">Showroom</a></li>
            <li><a href="#catalogo">Catálogo</a></li>
            <li><a href="#localizacao">Localização</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Contato</h4>
          <ul className="footer-links">
            {loja.email && <li><a href={`mailto:${loja.email}`}>{loja.email}</a></li>}
            {loja.horario && <li><span style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{loja.horario}</span></li>}
            {loja.tm?.whatsapp && (
              <li>
                <a href={`https://wa.me/55${loja.tm.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp TM
                </a>
              </li>
            )}
            {loja.bvb?.whatsapp && (
              <li>
                <a href={`https://wa.me/55${loja.bvb.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp BVB
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="copyright">© {year} Compor Acabamentos. Todos os direitos reservados.</p>
    </footer>
  );
}
