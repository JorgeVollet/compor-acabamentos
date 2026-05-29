'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  { target: 2000, prefix: '+', suffix: '', label: 'PRODUTOS', desc: 'Em estoque disponíveis para pronta entrega' },
  { target: 25, prefix: '+', suffix: '', label: 'ANOS', desc: 'De experiência no mercado de acabamentos' },
  { target: 50, prefix: '+', suffix: '', label: 'MARCAS', desc: 'Das melhores marcas nacionais e importadas' },
  { target: 1, prefix: '0', suffix: '', label: 'EQUIPE', desc: 'Especializada, preparada para te auxiliar' },
];

function CountUp({ target, prefix, suffix, active }: { target: number; prefix: string; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
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

  if (target === 1) return <>{prefix}{target}{suffix}</>;
  return <>{prefix}{val.toLocaleString('pt-BR')}{suffix}</>;
}

export function Features() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="features fade-in">
      {FEATURES.map((f) => (
        <div key={f.label} className="feature-box">
          <div className="feature-num">
            <CountUp target={f.target} prefix={f.prefix} suffix={f.suffix} active={active} />
          </div>
          <div className="feature-label">{f.label}</div>
          <p className="feature-desc">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
