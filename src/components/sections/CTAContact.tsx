import type { LojaUnidade } from '@/types';

interface CTAContactProps {
  tm?: LojaUnidade;
}

export function CTAContact({ tm }: CTAContactProps) {
  const phone = tm?.whatsapp?.replace(/\D/g, '') ?? '';
  const url = phone
    ? `https://wa.me/55${phone}?text=${encodeURIComponent('Olá! Gostaria de falar com um consultor da Compor Acabamentos.')}`
    : '#';

  return (
    <section className="cta-section fade-in">
      <span className="cta-label">Consultoria Especializada</span>
      <h2 className="cta-title">Pronto para transformar<br />seu ambiente?</h2>
      <p className="cta-text">
        Nossa equipe de especialistas está pronta para te ajudar a escolher os melhores acabamentos para o seu projeto.
        Entre em contato agora e receba um atendimento personalizado.
      </p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="cta-btn">
        Falar com Consultor →
      </a>
    </section>
  );
}
