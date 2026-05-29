'use client';

import { useEffect, useRef } from 'react';
import type { LojaUnidade } from '@/types';

interface CTAContactProps {
  tm?: LojaUnidade;
}

export function CTAContact({ tm }: CTAContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const whatsappNumber = (tm?.whatsapp || '5555984238121').replace(/\D/g, '');
  const message = encodeURIComponent('Olá! Vim pelo site e gostaria de falar com um consultor sobre minha obra.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section ref={sectionRef} className="cta-section fade-in">
      <div className="cta-label">Entre em Contato</div>
      <h2 className="cta-title">
        Não encontrou a especificação<br />
        exata que procurava?
      </h2>
      <p className="cta-text">
        Nosso portfólio está em constante evolução e temos acesso direto aos maiores fabricantes do mercado.
        Envie a planta ou a necessidade do seu projeto e nós encontramos a solução.
      </p>
      <a href={whatsappUrl} className="cta-btn" target="_blank" rel="noopener noreferrer">
        Falar com um Consultor Agora
      </a>
    </section>
  );
}
