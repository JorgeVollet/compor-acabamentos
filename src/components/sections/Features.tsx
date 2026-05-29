'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  {
    target: 2000,
    fixed: null as string | null,
    prefix: '+ ',
    label: 'Produtos em Estoque',
    desc: 'Ampla variedade de pisos, revestimentos, metais e acessórios disponíveis para pronta entrega.',
  },
  {
    target: 25,
    fixed: null as string | null,
    prefix: '+ ',
    label: 'Anos no Mercado',
    desc: 'Experiência sólida em atendimento a construtoras, arquitetos e clientes residenciais.',
  },
  {
    target: 50,
    fixed: null as string | null,
    prefix: '+ ',
    label: 'Marcas Exclusivas',
    desc: 'Portfólio cuidadosamente selecionado com as melhores marcas nacionais e importadas.',
  },
  {
    target: null as number | null,
    fixed: '01',
    prefix: '',
    label: 'Equipe Especializada',
    desc: 'Equipe técnica para auxiliar arquitetos, designers e clientes na escolha ideal para cada projeto.',
  },
];

function CountUp({ target, fixed, prefix, active }: { target: number | null; fixed: string | null; prefix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === null) return;
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, target]);

  if (fixed !== null) return <>{fixed}</>;
  if (target === null) return <>0</>;
  return <>{prefix}{val.toLocaleString('pt-BR')}</>;
}

export function Features() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          // Adiciona classe visible pro fade-in funcionar
          entry.target.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="features fade-in">
      {FEATURES.map((f) => (
        <div key={f.label} className="feature-box">
          <div className="feature-num">
            <CountUp target={f.target} fixed={f.fixed} prefix={f.prefix} active={active} />
          </div>
          <div className="feature-label">{f.label}</div>
          <p className="feature-desc">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
