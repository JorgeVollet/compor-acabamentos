# PROMPT DE CORREÇÃO 02 — Compor Acabamentos (Location)

Copie tudo entre `===== INÍCIO =====` e `===== FIM =====` e cole no Claude Code rodando dentro de `compor-next/`.

===== INÍCIO =====

# CONTEXTO

Site rodando OK exceto a seção **Localização** (`src/components/sections/Location.tsx`), que apresenta dois problemas:

1. **Lacuna preta gigante** entre a seção Reviews (avaliações Google) e a seção Localização — provavelmente as imagens das fachadas não estão renderizando ou o card não tem altura definida.
2. **Textos errados** (nome das lojas, subtítulo, cidade). MANTER o título "Nossas Lojas" como está — só corrigir o resto.

# FONTE DA VERDADE

`../alteracoes.html` linhas 2121-2184 — esta é a referência EXATA.

# REGRAS

1. NÃO PERGUNTAR NADA.
2. NÃO MEXER em outros componentes além de `Location.tsx` (e `globals.css` SE necessário).
3. Use as classes CSS que já existem em `globals.css`.
4. Ao terminar, rode `npm run build`.

# CORREÇÕES

## 1. Reescrever `src/components/sections/Location.tsx`

Substitua TODO o conteúdo do arquivo por:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import type { Loja } from '@/types';

interface LocationProps {
  loja: Loja;
}

interface StoreCardProps {
  name: string;
  city: string;
  data: { endereco: string; whatsapp: string; maps: string; instagram: string };
  img: string;
  alt: string;
  showDivider?: boolean;
}

function StoreCard({ name, city, data, img, alt, showDivider }: StoreCardProps) {
  const phone = (data.whatsapp || '').replace(/\D/g, '');
  const waUrl = phone
    ? `https://wa.me/55${phone}?text=${encodeURIComponent(
        'Olá! Gostaria de mais informações sobre os produtos da Compor Acabamentos.'
      )}`
    : '#';

  return (
    <div className="store-card">
      {showDivider && <div className="store-divider" aria-hidden="true" />}
      {/* IMPORTANTE: usar <img> HTML normal (não next/image fill) - o CSS já controla width/height */}
      <img src={img} alt={alt} className="store-card-img" loading="lazy" />
      <div className="store-card-overlay">
        <span className="store-card-city">{city}</span>
        <h3 className="store-card-name">{name}</h3>
        {data.endereco && <p className="store-card-address">{data.endereco}</p>}
        <div className="store-card-actions">
          {data.maps && (
            <a href={data.maps} target="_blank" rel="noopener noreferrer" className="btn-dark">
              📍 VER NO MAPA
            </a>
          )}
          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="btn-dark">
              📸 INSTAGRAM
            </a>
          )}
          {data.whatsapp && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">
              💬 WHATSAPP
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Location({ loja }: LocationProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="localizacao" className="location-section fade-in">
      <div className="location-section-header">
        <span className="section-label">Localização</span>
        <h2 className="title-serif section-title">Nossas Lojas</h2>
        <p className="section-sub">
          Duas unidades para melhor atendê-lo no Rio Grande do Sul.
        </p>
      </div>

      <div className="location-stores-grid">
        <StoreCard
          name="Três de Maio"
          city="Rio Grande do Sul"
          data={loja.tm ?? { endereco: '', whatsapp: '', maps: '', instagram: '' }}
          img="/fachadatm.webp"
          alt="Fachada Três de Maio"
          showDivider
        />
        <StoreCard
          name="Boa Vista do Buricá"
          city="Rio Grande do Sul"
          data={loja.bvb ?? { endereco: '', whatsapp: '', maps: '', instagram: '' }}
          img="/fachadabvb.webp"
          alt="Fachada Boa Vista do Buricá"
        />
      </div>

      {loja.horario && (
        <div className="loc-info">
          <p>{loja.horario}</p>
        </div>
      )}
    </section>
  );
}
```

## 2. Verificar/corrigir `src/app/globals.css`

O `store-card` precisa ter altura mínima e a imagem precisa preencher. Verifique se essas classes existem com estas regras (SE não existirem, ADICIONE; se existirem mas estiverem diferentes, ATUALIZE):

```css
/* ================= LOCALIZAÇÃO ================= */
.location-section {
  padding: 100px 5%;
  background: var(--bg-color);
}

.location-section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.location-stores-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.store-card {
  position: relative;
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--bg-card);
}

.store-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.store-card:hover .store-card-img {
  transform: scale(1.05);
}

.store-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 60%, transparent 100%);
  color: var(--white);
}

.store-card-city {
  display: block;
  font-size: 0.75rem;
  color: var(--gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.store-card-name {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: var(--white);
}

.store-card-address {
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.store-card-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.btn-dark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-dark:hover {
  background: var(--gold);
  color: var(--black);
  border-color: var(--gold);
}

.store-divider {
  display: none; /* opcional, decorativo */
}

.loc-info {
  text-align: center;
  margin-top: 3rem;
  color: var(--gray);
  font-size: 0.95rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .location-stores-grid {
    grid-template-columns: 1fr;
  }
  .store-card {
    height: 500px;
  }
}
```

**Observação:** se as classes acima já existirem no `globals.css` mas com valores que diferem (ex: outra altura), MANTENHA o que está lá — só garanta que `.store-card` tenha `height: 600px` (ou similar) e `.store-card-img` tenha `width: 100%; height: 100%; object-fit: cover;`. O problema da lacuna preta é provavelmente porque a imagem não tem altura definida.

## 3. Verificar prop `loja` em `src/app/page.tsx`

Confirme que está passando `loja={loja}` pro `<Location />` (objeto completo, com `tm`, `bvb` e `horario`).

# PASSO FINAL

1. Salve tudo
2. Rode `npm run build`
3. Reinicie `npm run dev`
4. Imprima: "✅ Location corrigido. Limpe cache (Ctrl+Shift+R) e teste."

# CHECKLIST

- [ ] Título da seção é "Nossas Lojas" (manter)
- [ ] Subtítulo é "Duas unidades para melhor atendê-lo no Rio Grande do Sul."
- [ ] Card esquerdo: "Três de Maio" com "Rio Grande do Sul"
- [ ] Card direito: "Boa Vista do Buricá" com "Rio Grande do Sul"
- [ ] Imagens das fachadas (`/fachadatm.webp` e `/fachadabvb.webp`) aparecem
- [ ] Lacuna preta entre Reviews e Location desapareceu
- [ ] Cards têm altura definida (~600px)
- [ ] Botões VER NO MAPA, INSTAGRAM, WHATSAPP funcionam
- [ ] Horário aparece embaixo
- [ ] Mobile: cards empilham (1 coluna)
- [ ] `npm run build` passa

EXECUTE TUDO AGORA. NÃO PERGUNTE NADA.

===== FIM =====
