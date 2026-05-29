import type { Loja } from '@/types';

interface FooterProps {
  loja: Loja;
}

export function Footer({ loja }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logocompor2.png"
            alt="Logo Compor Acabamentos"
            style={{ display: 'block', maxHeight: '70px', width: 'auto', objectFit: 'contain', margin: '0 0 1.5rem 0' }}
          />
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
