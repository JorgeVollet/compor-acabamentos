# PROMPT DE CORREÇÃO 01 — Compor Acabamentos

Copie tudo entre `===== INÍCIO =====` e `===== FIM =====` e cole no Claude Code rodando dentro de `compor-next/`.

===== INÍCIO =====

# CONTEXTO

Você está em `compor-next/` (Next.js 14 + TypeScript + Tailwind + Firebase). O site foi migrado de `../alteracoes.html` (HTML original, fonte da verdade).

O usuário Jorge testou em `localhost:3001` e reportou que está faltando renderizar:

1. **As 4 imagens do Hero Slider** (slides aparecem sem foto correta)
2. **A seção Features** (4 cards com números: +2000 produtos, +25 anos, +50 marcas, 01 equipe especializada)
3. **A seção CTA Contact** ("Não encontrou a especificação exata que procurava?" + botão "Falar com um Consultor")
4. **A seção Reviews** (avaliações do Google em carrossel)

# ⚠️ DESCOBERTA CRÍTICA SOBRE OS DADOS DO FIRESTORE

Inspecionei o Firestore e o documento `site/compor` tem DOIS sets de imagens hero:

**Set 1 — `assets.hero0..hero3`** (URLs Unsplash genéricas, defaults antigos):
```
assets.hero0 = "https://images.unsplash.com/photo-1600566752355-..."
assets.hero1 = "https://images.unsplash.com/photo-1556912173-..."
assets.hero2 = "https://images.unsplash.com/photo-1600607688969-..."
assets.hero3 = "https://images.unsplash.com/photo-1581858288590-..."
```

**Set 2 — `hero[i].img`** (caminhos das FOTOS REAIS da loja Compor):
```
hero[0].img = "img/fotoherosetor1.jpeg"  ← Soluções Químicas
hero[1].img = "img/herosetor2.jpg"       ← Revestimentos
hero[2].img = "img/herosetor3.jpeg"      ← Acessórios em Metais
hero[3].img = "img/herosetor4.png"       ← Compor Home
```

**O HTML antigo prioriza `hero[i].img`** (Set 2 — fotos reais). O componente HeroSlider atual provavelmente está pegando do Set 1 (Unsplash) ou está ignorando ambos. PRECISA inverter a prioridade.

# REGRAS

1. **NÃO PERGUNTAR NADA** — execute do início ao fim.
2. **CONSULTE `../alteracoes.html`** pra extrair a estrutura, classes CSS e textos EXATOS de cada seção.
3. **NÃO MUDE** outras seções que estão funcionando (Header, Footer, Showroom, Catalog, Location).
4. **Use as MESMAS classes CSS** que já estão no `globals.css`.
5. Ao terminar, rode `npm run build` pra garantir que compila.

# CORREÇÃO 1 — Hero Slider (imagens)

**Arquivo:** `src/components/sections/HeroSlider.tsx`

## Lógica correta de prioridade de imagem

```typescript
const SLIDE_IMAGES_LOCAL = [
  '/fotoherosetor1.jpeg',
  '/herosetor2.jpg',
  '/herosetor3.jpeg',
  '/herosetor4.png',
];

/**
 * Resolve a imagem do slide com prioridade:
 *   1. hero[i].img do Firestore (fotos REAIS da loja) - PRIORIDADE MÁXIMA
 *   2. SLIDE_IMAGES_LOCAL[i] (fallback local em /public)
 *   3. assets.heroX (Unsplash defaults - última opção)
 * 
 * Trata também o prefixo "img/" do HTML antigo, convertendo pra "/" raiz public.
 */
function resolveSlideImage(
  index: number,
  slide: Hero | undefined,
  assets: Assets
): string {
  // Prioridade 1: hero[i].img (fotos reais cadastradas)
  if (slide?.img && slide.img.trim() !== '') {
    const img = slide.img.trim();
    // Caminhos antigos "img/foo.jpg" => "/foo.jpg" (vai pra /public)
    if (img.startsWith('img/')) return '/' + img.substring(4);
    // Caminhos absolutos http(s) ou já começando com /
    if (img.startsWith('http') || img.startsWith('/')) return img;
    // Qualquer outra coisa - tenta tratar como raiz
    return '/' + img;
  }
  
  // Prioridade 2: fallback local (sempre funciona, arquivos em /public)
  if (SLIDE_IMAGES_LOCAL[index]) return SLIDE_IMAGES_LOCAL[index];
  
  // Prioridade 3: assets.heroX (Unsplash defaults)
  const assetKey = `hero${index}` as keyof Assets;
  const fromAssets = assets[assetKey];
  if (typeof fromAssets === 'string' && fromAssets.trim() !== '') return fromAssets;
  
  // Último fallback: primeira imagem local
  return SLIDE_IMAGES_LOCAL[0];
}
```

## Defaults pra quando hero[] vier vazio

```typescript
const DEFAULT_HERO: Hero[] = [
  {
    label: 'Soluções Químicas',
    title: 'Soluções químicas e de uso profissional.',
    desc: 'As melhores marcas de impermeabilizantes, tintas, aditivos e acabamentos. Uma linha completa para o setor da construção civil com a melhor consultoria técnica do início ao fim da sua obra.',
    img: 'img/fotoherosetor1.jpeg',
    tag: 'Ambientes Memoráveis',
    btn: 'Conhecer Produtos',
  },
  {
    label: 'Revestimentos',
    title: 'Revestimentos cerâmicos e porcelanatos',
    desc: 'Revestimentos cerâmicos, porcelanatos e pedras naturais, para transformar seu ambiente.',
    img: 'img/herosetor2.jpg',
    tag: 'Ambientes Memoráveis',
    btn: 'Ver Catálogo',
  },
  {
    label: 'Acessórios em Metais',
    title: 'Metais que irão definir o padrão de sua cozinha e banheiro',
    desc: 'Torneiras, acessórios em metal e aquecedores. Uma seleção de duchas elétricas, híbridas e frias.',
    img: 'img/herosetor3.jpeg',
    tag: 'Ambientes Memoráveis',
    btn: 'Ver Metais',
  },
  {
    label: 'Compor Home',
    title: 'Compor Home',
    desc: 'Um Home Center completo para quem deseja renovar, reformar ou decorar. Aqui você encontra tudo em um só lugar com um espaço acolhedor, para você sentir-se em CASA, sempre com inovações e tendências nas melhores marcas.',
    img: 'img/herosetor4.png',
    tag: 'Ambientes Memoráveis',
    btn: 'VER LINHA COMPOR HOME',
  },
];

// No início do componente:
const slides = hero && hero.length > 0 ? hero : DEFAULT_HERO;
```

## Comportamento do Hero (extrair do HTML antigo, linhas 1739-1804)

- `<section id="inicio" className="hero">`
- 4 slides; o slide 0 começa com classe `active`
- Cada slide: `<img className="slide-bg">` + `<div className="slide-overlay">` + `<div className="slide-content">` (com `.hero-tag`, `.hero-title`, `.hero-sub`, `.btn-gold`)
- Slide 0 com `priority` (não lazy). Demais com `loading="lazy"`
- `<div className="hero-arrows">` com botões `prev`/`next` (← →)
- `<div className="hero-controls">` com 4 `.hero-label` clicáveis (labels embaixo)
- Auto-play: 5 segundos por slide
- Use `useState` pro slide ativo, `useEffect` com `setInterval` pro auto-play
- Botão do slide é um link que leva pra `#showroom`, `#catalogo` ou filtra categoria

## Image component

Use `next/image` mas como precisamos suportar qualquer URL e imagens locais, e `next.config.js` já tem `remotePatterns: [{ hostname: '**' }]`, dá pra usar com `fill` ou width/height definido. Ou se preferir simplicidade, use `<img>` HTML mesmo (que é o que o HTML antigo faz).

# CORREÇÃO 2 — Features (números/dados da loja)

**Arquivo:** `src/components/sections/Features.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  {
    target: 2000,
    prefix: '+ ',
    label: 'Produtos em Estoque',
    desc: 'Ampla variedade de pisos, revestimentos, metais e acessórios disponíveis para pronta entrega.',
  },
  {
    target: 25,
    prefix: '+ ',
    label: 'Anos no Mercado',
    desc: 'Experiência sólida em atendimento a construtoras, arquitetos e clientes residenciais.',
  },
  {
    target: 50,
    prefix: '+ ',
    label: 'Marcas Exclusivas',
    desc: 'Portfólio cuidadosamente selecionado com as melhores marcas nacionais e importadas.',
  },
  {
    target: null,
    fixed: '01',
    label: 'Equipe Especializada',
    desc: 'Equipe técnica para auxiliar arquitetos, designers e clientes na escolha ideal para cada projeto.',
  },
];
```

Use IntersectionObserver pra detectar entrada no viewport. Quando entra:
1. Adiciona classe `visible` (pra `.fade-in.visible`)
2. Anima contador de 0 até `target` em 2 segundos com `requestAnimationFrame`
3. Para o card "Equipe Especializada", mostra `01` fixo (sem animação)

Renderiza dentro de `<section className="features fade-in">` com 4 `<div className="feature-box">` (`.feature-num`, `.feature-label`, `.feature-desc`).

# CORREÇÃO 3 — CTA Contact

**Arquivo:** `src/components/sections/CTAContact.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import type { Loja } from '@/types';

interface CTAContactProps {
  tm?: Loja['tm'];
}

export function CTAContact({ tm }: CTAContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
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
```

# CORREÇÃO 4 — Reviews (carrossel Google)

**Arquivo:** `src/data/reviews.ts` — garantir 8 reviews completos:

```typescript
export interface Review {
  author: string;
  date: string;
  stars: number;
  text: string;
  avatarGradient: string;
  initial: string;
}

export const REVIEWS: Review[] = [
  {
    author: 'Bruno Oswaldo da Rosa',
    date: '9 meses atrás',
    stars: 5,
    initial: 'B',
    avatarGradient: 'linear-gradient(135deg,#c9a84c,#8a6a1f)',
    text: 'Atendimento excelente! Todas as atendentes são mulheres muito educadas, atenciosas e entendem muito do que fazem. Fui super bem orientado na hora de escolher os acabamentos. Um ambiente acolhedor e profissional. Super recomendo.',
  },
  {
    author: 'Ademar Rocznieski',
    date: '4 meses atrás · Local Guide',
    stars: 5,
    initial: 'A',
    avatarGradient: 'linear-gradient(135deg,#4c8fc9,#1f4a8a)',
    text: 'Ótimo atendimento, produtos de qualidade, os vendedores ajudam como consultores, facilitando nas escolhas.',
  },
  {
    author: 'Simone Fonseca',
    date: '9 meses atrás',
    stars: 5,
    initial: 'S',
    avatarGradient: 'linear-gradient(135deg,#c94c7a,#8a1f4c)',
    text: 'Quando fomos até a loja tínhamos todas as dúvidas. Fomos bem recebidos com muita atenção e objetivos, com a principal demonstração do produto. A qualidade foi fundamental para nossa casa.',
  },
  {
    author: 'Thiago Da Rosa',
    date: '9 meses atrás',
    stars: 5,
    initial: 'T',
    avatarGradient: 'linear-gradient(135deg,#4cc97a,#1f8a4c)',
    text: 'Ótimo atendimento, vendedoras experientes, loja linda e com diversidade de produtos.',
  },
  {
    author: 'Patricia Hammes Fritsch',
    date: '9 meses atrás · 2 avaliações',
    stars: 5,
    initial: 'P',
    avatarGradient: 'linear-gradient(135deg,#c97a4c,#8a4c1f)',
    text: 'A qualidade dos produtos é impecável, e o atendimento foi sempre profissional e atencioso. Recomendo de olhos fechados! Cinco estrelas bem merecidas!',
  },
  {
    author: 'Amelia Elizete Noronha',
    date: 'Um ano atrás',
    stars: 5,
    initial: 'A',
    avatarGradient: 'linear-gradient(135deg,#7a4cc9,#4c1f8a)',
    text: 'Empresa com uma equipe de profissionais competentes e de muita responsabilidade. A loja fornece materiais de ótima qualidade. Um atendimento maravilhoso, parabéns a toda a equipe!',
  },
  {
    author: 'Goncho Eco',
    date: '2 anos atrás · Local Guide',
    stars: 5,
    initial: 'G',
    avatarGradient: 'linear-gradient(135deg,#4cc9c9,#1f7a8a)',
    text: 'Na Compor você encontra grande variedade de pisos, porcelanatos, acabamentos. O atendimento é personalizado, com orçamentos precisos e acompanhamento na obra. Preço justo. Super recomendamos!',
  },
  {
    author: 'Marilu Kleinert',
    date: 'Um ano atrás · 3 avaliações',
    stars: 5,
    initial: 'M',
    avatarGradient: 'linear-gradient(135deg,#c9c94c,#8a7a1f)',
    text: 'Ótimo atendimento e acompanhamento desde o orçamento até o final da obra. Preços justos e produtos de ótima qualidade.',
  },
];
```

**Arquivo:** `src/components/sections/Reviews.tsx`:

```tsx
'use client';

import { REVIEWS } from '@/data/reviews';

export function Reviews() {
  const looped = [...REVIEWS, ...REVIEWS]; // duplica pra loop infinito

  return (
    <section className="reviews-section fade-in visible">
      <div className="reviews-top">
        <div className="reviews-left-title">
          <span className="reviews-label">Avaliações do Google</span>
          <h2 className="reviews-title">O que dizem<br />nossos Clientes</h2>
          <p className="reviews-source">Avaliações verificadas pelo Google</p>
        </div>
        <div className="reviews-score-box">
          <div className="reviews-score-number">5,0</div>
          <div className="reviews-stars">★★★★★</div>
          <div className="reviews-score-label">Média de Avaliações</div>
          <div className="reviews-count">Baseado em 33 avaliações</div>
        </div>
      </div>
      <div className="reviews-track-wrapper">
        <div className="reviews-track">
          {looped.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-card-header">
                <div className="review-avatar" style={{ background: r.avatarGradient }}>{r.initial}</div>
                <div className="review-author-info">
                  <div className="review-author-name">{r.author}</div>
                  <div className="review-date">{r.date}</div>
                </div>
              </div>
              <div className="review-stars-row">{'★'.repeat(r.stars)}</div>
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

A animação do carrossel infinito está no `globals.css` — classe `.reviews-track` deve ter `animation: scroll-x linear infinite`. Se não tiver, copie do HTML antigo.

# CORREÇÃO 5 — BUG no array de fotos de produtos

**Problema:** No Firestore tem produtos com array `fotos` quebrado. Exemplo do Porcelanato Munari:
```
fotos[0] = "https://media.falabella.com/sodimacBR/1681670_11/w=1036"  ✅
fotos[1] = "h=832"        ❌ lixo (param solto)
fotos[2] = "f=webp"       ❌ lixo
fotos[3] = "fit=contain"  ❌ lixo
fotos[4] = "q=85"         ❌ lixo
fotos[5] = "https://media.falabella.com/sodimacBR/1681670_1/w=1036"  ✅
... etc
```

**Solução:** Filtrar `fotos` pra mostrar só strings que começam com `http`.

**Arquivos a corrigir:**
- `src/components/ui/ProductCard.tsx` — usar `produto.fotos.filter(f => f.startsWith('http'))` antes de pegar `[0]`
- `src/components/modals/ProductModal.tsx` — mesma filtragem antes de renderizar galeria/thumbs
- Criar helper em `src/lib/format.ts`:

```typescript
export function cleanFotos(fotos: string[] | undefined): string[] {
  if (!fotos || !Array.isArray(fotos)) return [];
  return fotos.filter(f => typeof f === 'string' && f.trim().startsWith('http'));
}
```

Usar `cleanFotos(produto.fotos)` em todo lugar que renderizar fotos de produto.

# CORREÇÃO 6 — Garantir page.tsx renderizando tudo

Confira que `src/app/page.tsx` renderiza nessa ordem:

```tsx
<Header onCartClick={() => setCartOpen(true)} />
<HeroSlider hero={hero} assets={assets} />
<Features />
<Showroom initialProdutos={produtos} onProductClick={setSelectedProduto} />
<CTAContact tm={loja.tm} />
<Catalog initialProdutos={produtos} onProductClick={setSelectedProduto} />
<Reviews />
<Location loja={loja} />
<Footer loja={loja} assets={assets} />
<WhatsAppFloat tm={loja.tm} />
<BackToTop />
<ProductModal produto={selectedProduto} onClose={() => setSelectedProduto(null)} lojaWhatsapp={loja.tm?.whatsapp} />
<CartModal open={cartOpen} onClose={() => setCartOpen(false)} lojaWhatsapp={loja.tm?.whatsapp} />
```

Se faltar algum, adicione.

# CORREÇÃO 7 — Garantir globals.css completo

Verifica que `src/app/globals.css` tem TODAS estas classes. Se faltar alguma, copia do `../alteracoes.html` (toda a tag `<style>` entre linhas 35-1702):

- Hero: `.hero`, `.slide`, `.slide.active`, `.slide-bg`, `.slide-overlay`, `.slide-content`, `.hero-tag`, `.hero-title`, `.hero-sub`, `.btn-gold`, `.hero-arrows`, `.arrow-btn`, `.hero-controls`, `.hero-label`, `.hero-label.active`
- Features: `.features`, `.feature-box`, `.feature-num`, `.feature-label`, `.feature-desc`
- CTA: `.cta-section`, `.cta-label`, `.cta-title`, `.cta-text`, `.cta-btn`
- Reviews: `.reviews-section`, `.reviews-top`, `.reviews-left-title`, `.reviews-label`, `.reviews-title`, `.reviews-source`, `.reviews-score-box`, `.reviews-score-number`, `.reviews-stars`, `.reviews-score-label`, `.reviews-count`, `.reviews-track-wrapper`, `.reviews-track`, `.review-card`, `.review-card-header`, `.review-avatar`, `.review-author-info`, `.review-author-name`, `.review-date`, `.review-stars-row`, `.review-text`
- Animação: `.fade-in`, `.fade-in.visible`
- Animação do carrossel reviews (keyframes `scroll-x` ou similar)

# PASSO FINAL

1. Salve todos os arquivos
2. Rode `npm run build` — deve compilar sem erros
3. Reinicie `npm run dev` (Ctrl+C e roda de novo) pra forçar recarregar
4. Imprima: "✅ Correções aplicadas. Limpe cache do navegador (Ctrl+Shift+R) e teste em http://localhost:3001"

# CHECKLIST

- [ ] Hero mostra 4 imagens REAIS da loja (priorizando `hero[i].img`)
- [ ] Imagens locais funcionam como fallback
- [ ] Features tem 4 cards com contadores animados ao entrar no viewport
- [ ] CTA Contact aparece com botão WhatsApp funcional
- [ ] Reviews em carrossel infinito com 8 avaliações
- [ ] Produto Porcelanato Munari mostra só URLs válidas (sem lixo "h=832", etc)
- [ ] `npm run build` passa sem erros
- [ ] page.tsx renderiza todos os componentes na ordem correta
- [ ] globals.css tem todas as classes necessárias

EXECUTE TUDO AGORA. NÃO PERGUNTE NADA.

===== FIM =====
