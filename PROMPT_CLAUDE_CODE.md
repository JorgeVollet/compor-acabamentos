# PROMPT DEFINITIVO PARA CLAUDE CODE

Copie TODO o conteúdo entre os marcadores `===== INÍCIO =====` e `===== FIM =====` e cole no Claude Code rodando dentro de `E:\DESENVOLVIMENTO DE SITES\SITE COMPOR ACABAMENTOS\PROJETO COMPOR CORRETO\compor-next`.

===== INÍCIO =====

# CONTEXTO E MISSÃO

Você é um Arquiteto Full-Stack Sênior. Estou migrando o site da **Compor Acabamentos** (loja de pisos, porcelanatos, revestimentos, tintas, metais — Horizontina/RS) de HTML puro para **Next.js 14 + TypeScript + Tailwind + Firebase**.

O HTML original está em `../alteracoes.html` (3.773 linhas, contém TODO o design, CSS, JS e estrutura — é sua FONTE DA VERDADE). O backup do Firestore está em `../backup/backup_compor_29-05-2026.json` (use pra entender o schema dos dados).

A estrutura de pastas, `package.json`, configs de TS/Tailwind/Next, `.gitignore`, `.env.local` (com credenciais reais Firebase) e imagens em `public/` JÁ ESTÃO CRIADOS. Você vai criar TUDO QUE FALTA pra ter o site 100% funcional.

# REGRAS INEGOCIÁVEIS

1. **NÃO PERGUNTAR NADA** — execute do início ao fim. Tome decisões técnicas sozinho.
2. **PARIDADE VISUAL 100%** com `../alteracoes.html` — mesmas cores, fontes, espaçamentos, animações, comportamentos.
3. **ZERO PERDA DE DADOS** — leia/escreva no mesmo documento Firestore `site/compor` que o HTML antigo usa. Mesmo schema, mesmos campos.
4. **NUNCA hardcode credenciais** — use `process.env.NEXT_PUBLIC_FIREBASE_*` (já configurado em `.env.local`).
5. **Login admin** = Firebase Auth (email/senha). NUNCA o `admin/compor2026` hardcoded do HTML antigo.
6. **TypeScript estrito** — sem `any` quando puder evitar.
7. **Mobile-first** — responsivo em tudo.
8. **Acessibilidade** — alt em imagens, aria-labels em botões de ícone, contraste WCAG AA.
9. **SEO completo** — Metadata API do Next.js, OpenGraph, sitemap, robots.
10. **Use `'use client'`** apenas onde for necessário (interatividade). Mantenha o resto Server Components.

# DESIGN SYSTEM (extraído do HTML antigo)

**Cores (CSS variables — declare em `globals.css`):**
- `--bg-color: #0a0a0a`
- `--bg-footer: #050505`
- `--bg-panel: #111111`
- `--bg-card: #151515`
- `--gold: #c9a84c`
- `--black: #000000`
- `--white: #f5f0e8`
- `--gray: #9a9a8a`

**Fontes:**
- `--font-title: 'blemo', serif` → CDN: `https://db.onlinewebfonts.com/c/0b9725ed798decbd77f9ba37742ba578?family=blemo`
- `--font-body: 'Montserrat', sans-serif` → Google Fonts (pesos 200,300,400,500,600,700)
- `--font-special: 'Autography', cursive` → CDN: `https://fonts.cdnfonts.com/css/autography`

**Transition padrão:** `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

# CATEGORIAS DO CATÁLOGO (FIXAS — não vêm do Firestore)

Crie `src/data/categories.ts` com EXATAMENTE estas 10 categorias (+ filtro TODOS):

| slug | label |
|------|-------|
| ceramicas | CERÂMICAS E PORCELANATOS |
| revestimentos_naturais | REVESTIMENTOS NATURAIS |
| quimicos | QUÍMICOS E USO PROFISSIONAL |
| tintas | TINTAS E ACABAMENTO |
| vinilicos | PISOS VINÍLICOS E LAMINADOS |
| loucas | LOUÇAS SANITÁRIAS |
| metais | METAIS |
| iluminacao | ILUMINAÇÃO |
| compor_home | COMPOR HOME |
| acessorios | ACESSÓRIOS |

Exporte tipo `CategorySlug`, array `CATEGORIES` com `{slug, label, labelSingular, description, order}`, e helpers `getCategoryBySlug()`, `getCategoryLabel()`, `getAllCategorySlugs()`.

# SCHEMA FIRESTORE (já existente — NÃO MUDAR)

Documento: `site/compor` com os campos:

```typescript
interface SiteData {
  hero: Array<{
    label: string;
    title: string;
    desc: string;
    img: string;
    tag: string;
    btn: string;
  }>;
  produtos: Array<{
    id: string;
    nome: string;
    categoria: CategorySlug;
    preco: string;       // ex: "R$ 500,00/un"
    descricao: string;
    specs: string;
    fotos: string[];     // URLs
    badge: string;       // "TOP VENDA" | "DESTAQUE" | "LANÇAMENTO" | etc
    destaque: boolean;   // aparece no Showroom
    visivel: boolean;    // aparece publicamente
  }>;
  loja: {
    email: string;
    horario: string;
    tm: { endereco: string; whatsapp: string; maps: string; instagram: string };
    bvb: { endereco: string; whatsapp: string; maps: string; instagram: string };
  };
  assets: {
    hero0: string; hero1: string; hero2: string; hero3: string;
    logo: string; loc: string;
    logoPos: number; logoPosX: number; logoSize: number;
    logoSubText: string; logoSubPosX: number; logoSubPosY: number;
  };
}
```

# ESTRUTURA DE ARQUIVOS A CRIAR

```
src/
├── app/
│   ├── layout.tsx                      ← layout global + metadata + fontes
│   ├── page.tsx                        ← homepage (Server Component, busca dados Firestore)
│   ├── globals.css                     ← CSS vars + reset + utilities + animações
│   ├── sitemap.ts                      ← sitemap automático
│   ├── robots.ts                       ← robots.txt
│   └── admin/
│       ├── layout.tsx                  ← protege rota com Auth
│       ├── page.tsx                    ← painel principal
│       └── login/
│           └── page.tsx                ← login Firebase Auth
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  ← 'use client' — header com fade out no scroll
│   │   ├── Footer.tsx                  ← footer estático
│   │   ├── WhatsAppFloat.tsx           ← 'use client' — botão WhatsApp flutuante
│   │   └── BackToTop.tsx               ← 'use client' — botão voltar ao topo
│   ├── sections/
│   │   ├── HeroSlider.tsx              ← 'use client' — slider auto-play + arrows + labels
│   │   ├── Features.tsx                ← 'use client' — 4 cards com contador animado
│   │   ├── Showroom.tsx                ← 'use client' — produtos destaque + busca
│   │   ├── Catalog.tsx                 ← 'use client' — grid + 11 filtros + paginação
│   │   ├── CTAContact.tsx              ← link p/ WhatsApp consultor
│   │   ├── Reviews.tsx                 ← 'use client' — carrossel infinito 8 reviews
│   │   └── Location.tsx                ← 2 cards de loja + botões maps/insta/whats
│   ├── modals/
│   │   ├── ProductModal.tsx            ← 'use client' — galeria + add ao carrinho
│   │   ├── CartModal.tsx               ← 'use client' — lista itens + envio WhatsApp
│   │   └── LoginModal.tsx              ← 'use client' — modal login admin (alternativa à rota /admin/login)
│   ├── admin/
│   │   ├── AdminShell.tsx              ← 'use client' — sidebar + topbar
│   │   ├── Dashboard.tsx               ← stats (qtd produtos, destaques, etc)
│   │   ├── ProductsManager.tsx         ← CRUD produtos
│   │   ├── ProductForm.tsx             ← form de criar/editar produto
│   │   ├── StoreConfig.tsx             ← editar loja.email, horario, tm, bvb
│   │   ├── AppearanceConfig.tsx        ← editar assets (logo, hero imgs, etc)
│   │   └── BackupManager.tsx           ← exportar/importar JSON
│   └── ui/
│       ├── Button.tsx                  ← btn-gold, btn-outline, btn-dark variants
│       ├── ProductCard.tsx             ← card usado em Showroom e Catalog
│       ├── Modal.tsx                   ← base de modal reutilizável
│       ├── Input.tsx                   ← input estilizado
│       └── Toast.tsx                   ← 'use client' — notificação
│
├── context/
│   ├── AuthContext.tsx                 ← 'use client' — provider de Firebase Auth
│   ├── CartContext.tsx                 ← 'use client' — provider do carrinho (com localStorage)
│   └── SiteDataContext.tsx             ← 'use client' — dados do site (cache do Firestore)
│
├── hooks/
│   ├── useAuth.ts                      ← hook do AuthContext
│   ├── useCart.ts                      ← hook do CartContext
│   ├── useSiteData.ts                  ← hook do SiteDataContext
│   └── useScrollDirection.ts           ← detectar scroll up/down (pro header fade)
│
├── lib/
│   ├── firebase.ts                     ← inicialização Firebase (app, db, auth, storage)
│   ├── firestore.ts                    ← getSiteData(), saveSiteData(), CRUD produtos
│   ├── auth.ts                         ← signIn, signOut, onAuthChanged
│   └── format.ts                       ← formatPrice, formatPhone, etc
│
├── types/
│   └── index.ts                        ← Produto, Hero, Loja, Assets, SiteData, CartItem
│
└── data/
    ├── categories.ts                   ← 10 categorias + helpers (ESPECIFICADO ACIMA)
    └── reviews.ts                      ← 8 reviews estáticos (extrair do HTML antigo linhas 1918-2017)
```

# ESPECIFICAÇÕES POR COMPONENTE

## `src/lib/firebase.ts`
- Inicializar Firebase com vars de ambiente
- Singleton: `if (!getApps().length) initializeApp(...)` pra evitar duplicação
- Exportar `app`, `db` (Firestore), `auth`, `storage`
- Usar `firebase/app`, `firebase/firestore`, `firebase/auth`, `firebase/storage` (SDK modular v9+, NÃO compat)

## `src/lib/firestore.ts`
- `getSiteData(): Promise<SiteData>` — busca `site/compor`
- `updateSiteData(data: Partial<SiteData>): Promise<void>` — merge no documento
- `subscribeSiteData(callback)` — onSnapshot pra updates em tempo real
- Tratamento de erro: se documento não existe, retorna estrutura default vazia

## `src/lib/auth.ts`
- `signInAdmin(email, password)` — wrapper signInWithEmailAndPassword
- `signOutAdmin()`
- `onAuthChanged(callback)` — onAuthStateChanged
- Mensagens de erro em PT-BR ("Email ou senha incorretos", etc)

## `src/app/layout.tsx`
- Metadata global (title, description, keywords, OG tags — extrair do HTML linhas 7-16)
- Import Google Fonts via `next/font/google` pra Montserrat
- Import fontes especiais via `<link>` no head
- Wrappers: `<AuthProvider>`, `<SiteDataProvider>`, `<CartProvider>`
- `lang="pt-BR"`

## `src/app/page.tsx`
- Server Component que busca `getSiteData()` no servidor
- Renderiza: `<Header />`, `<HeroSlider data={hero} />`, `<Features />`, `<Showroom produtos={produtos} />`, `<Catalog produtos={produtos} />`, `<CTAContact />`, `<Reviews />`, `<Location loja={loja} />`, `<Footer />`, `<WhatsAppFloat />`, `<BackToTop />`, `<ProductModal />`, `<CartModal />`

## `src/app/globals.css`
- Copiar TODO o CSS do `<style>` do HTML antigo (linhas 35-1702)
- Substituir `:root` por CSS vars declaradas
- Manter classes utilitárias (.title-serif, .text-gold, .fade-in, etc)
- Adicionar `@tailwind base; @tailwind components; @tailwind utilities;` no topo
- Importar fontes especiais via `@import url(...)`

## `src/components/layout/Header.tsx` (`'use client'`)
- Logo + nav links + ícone carrinho com badge
- Hide on scroll down, show on scroll up (use `useScrollDirection`)
- Background blur + transition
- Menu mobile (hamburger)
- Link "Carrinho" abre `CartModal` via CartContext

## `src/components/sections/HeroSlider.tsx` (`'use client'`)
- 4 slides com auto-play (5s por slide)
- Setas prev/next
- Labels clicáveis embaixo
- Animação fade entre slides
- Cada slide tem botão CTA que ou rola pra `#showroom`/`#catalogo` ou filtra categoria
- Slide 4 botão filtra categoria `compor_home` no Catalog

## `src/components/sections/Features.tsx` (`'use client'`)
- 4 boxes: +2000 produtos, +25 anos, +50 marcas, 01 equipe especializada
- Contador animado quando entra no viewport (use IntersectionObserver)
- Animação `fade-in` ao entrar na tela

## `src/components/sections/Showroom.tsx` (`'use client'`)
- Filtra produtos onde `destaque === true && visivel === true`
- Grid 3 colunas (responsivo)
- Search bar (filtra por nome/descricao em tempo real)
- Card abre `ProductModal`
- Se vazio: mensagem "Nenhum produto em destaque..."

## `src/components/sections/Catalog.tsx` (`'use client'`)
- 11 botões de filtro (TODOS + 10 categorias do `categories.ts`)
- Grid 3 colunas
- Paginação "ver mais" (8 produtos por vez)
- Filtra produtos onde `visivel === true`
- Botão de filtro ativo destacado (gold)

## `src/components/sections/Reviews.tsx` (`'use client'`)
- Carrossel infinito (CSS animation translateX)
- 8 reviews em `src/data/reviews.ts` (extrair do HTML linhas 1918-2017)
- Card com avatar circular gradiente, nome, data, estrelas, texto

## `src/components/sections/Location.tsx`
- 2 cards lado a lado (TM e BVB) - mobile: stack
- Imagem da fachada + overlay com info
- Botões: VER NO MAPA, INSTAGRAM, WHATSAPP
- Dados vêm de `loja.tm` e `loja.bvb`

## `src/components/modals/ProductModal.tsx` (`'use client'`)
- Galeria com thumbs clicáveis (atualiza imagem principal)
- Info: categoria, nome, preço, specs, descrição
- Botões: "ADICIONAR AO CARRINHO" e "DÚVIDAS / ORÇAMENTO" (link WhatsApp)
- Abrir/fechar via context ou state local + ref

## `src/components/modals/CartModal.tsx` (`'use client'`)
- Lista itens do carrinho (`useCart`)
- Aumentar/diminuir quantidade, remover item
- Total estimado (soma preços * qty)
- Botão "ENVIAR PEDIDO PARA WHATSAPP" → monta mensagem formatada + abre wa.me
- Mensagem WhatsApp: "Olá! Tenho interesse nos seguintes produtos:\n\n- {nome} (x{qty}) - {preco}\n...\n\nTotal estimado: {total}"

## `src/context/CartContext.tsx` (`'use client'`)
- State: `items: CartItem[]`
- Métodos: `addItem`, `removeItem`, `updateQty`, `clearCart`, `getTotalCount`, `getTotalPrice`
- Persistência: `localStorage` (chave `compor_cart`)
- Sync on mount via useEffect

## `src/context/AuthContext.tsx` (`'use client'`)
- State: `user`, `loading`
- onAuthStateChanged listener
- Métodos: `signIn`, `signOut`

## `src/app/admin/layout.tsx`
- Verifica auth (`useAuth`)
- Se não autenticado: redirect pra `/admin/login`
- Loading state enquanto verifica
- Wrapper `<AdminShell>` se autenticado

## `src/app/admin/login/page.tsx`
- Form email/senha
- Chama `signIn` do AuthContext
- Erro em PT-BR
- Após login: redirect pra `/admin`

## `src/components/admin/ProductsManager.tsx`
- Tabela com produtos (id, nome, categoria, preço, destaque, visível)
- Botões: Editar (abre ProductForm), Excluir (confirm), Novo Produto
- Toggle destaque/visivel inline

## `src/components/admin/ProductForm.tsx`
- Campos: nome, categoria (select com `CATEGORIES`), preço, badge, descrição, specs, fotos (URLs), destaque (checkbox), visivel (checkbox)
- Validação: campos obrigatórios marcados
- Salvar = updateSiteData com o array de produtos atualizado

## `src/components/admin/BackupManager.tsx`
- Botão "Exportar Backup" → download JSON com timestamp
- Botão "Importar Backup" → input file → confirm → updateSiteData
- Avisos vermelhos sobre cuidado

# REVIEWS ESTÁTICOS (`src/data/reviews.ts`)

Extrair do HTML antigo (linhas 1918-2017). Lista de 8 reviews:

```typescript
export interface Review {
  author: string;
  date: string;
  stars: number;
  text: string;
  avatarGradient: string;  // ex: "linear-gradient(135deg,#c9a84c,#8a6a1f)"
  initial: string;
}

export const REVIEWS: Review[] = [
  { author: 'Bruno Oswaldo da Rosa', date: '9 meses atrás', stars: 5, initial: 'B', avatarGradient: 'linear-gradient(135deg,#c9a84c,#8a6a1f)', text: 'Atendimento excelente! Todas as atendentes são mulheres muito educadas, atenciosas e entendem muito do que fazem. Fui super bem orientado na hora de escolher os acabamentos. Um ambiente acolhedor e profissional. Super recomendo.' },
  { author: 'Ademar Rocznieski', date: '4 meses atrás · Local Guide', stars: 5, initial: 'A', avatarGradient: 'linear-gradient(135deg,#4c8fc9,#1f4a8a)', text: 'Ótimo atendimento, produtos de qualidade, os vendedores ajudam como consultores, facilitando nas escolhas.' },
  // ... extrair os outros 6 do HTML
];
```

# PASSO A PASSO QUE VOCÊ (CLAUDE CODE) DEVE EXECUTAR

1. **Instalar dependências**: `npm install`
2. **Criar TODOS os arquivos listados acima** seguindo as specs
3. **Validar**: rodar `npm run build` — deve compilar sem erros
4. **Testar local**: rodar `npm run dev` em background e testar `curl http://localhost:3000`
5. **Criar `README.md`** completo com:
   - Como rodar local
   - Como adicionar produtos
   - Como fazer deploy na Netlify
   - Onde mexer em cada coisa (tabela "quero alterar X → vou em Y")
6. **Criar `firestore.rules`** seguro:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /site/compor {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
7. **Criar `netlify.toml`** com config Next.js
8. **Git**: inicializar, fazer commit "feat: migração inicial Next.js + TypeScript + Tailwind + Firebase", configurar remote `https://github.com/JorgeVollet/compor-acabamentos.git`, branch `main`

# CHECKLIST DE QUALIDADE (verifique ao final)

- [ ] `npm run build` passa sem erros TypeScript
- [ ] Site abre em `localhost:3000` sem erros no console
- [ ] Header com fade no scroll funciona
- [ ] Hero slider auto-play e setas funcionam
- [ ] Features contador anima
- [ ] Showroom e Catalog leem do Firestore real
- [ ] Filtros do Catalog mostram as 11 opções
- [ ] Search bar do Showroom filtra
- [ ] Modal de produto abre e fecha
- [ ] Carrinho persiste no localStorage
- [ ] Botão "Enviar pedido WhatsApp" abre wa.me com mensagem formatada
- [ ] Reviews fazem carrossel infinito
- [ ] Mapa, Instagram e WhatsApp das lojas funcionam
- [ ] Footer com todos os links
- [ ] WhatsApp flutuante e back-to-top aparecem
- [ ] `/admin/login` permite login com Firebase Auth
- [ ] `/admin` protegido (redireciona se não logado)
- [ ] Painel admin lista, cria, edita, exclui produtos
- [ ] Toggle destaque/visível funciona
- [ ] Backup exporta e importa JSON
- [ ] Mobile responsivo em todas as seções
- [ ] Metadata SEO completa (Open Graph, keywords)
- [ ] sitemap.xml gerado
- [ ] robots.txt gerado

# O QUE NÃO FAZER

- ❌ NÃO mudar o schema do Firestore (`site/compor`)
- ❌ NÃO usar `localStorage` em Server Components
- ❌ NÃO commitar `.env.local`
- ❌ NÃO usar Firebase compat SDK (use modular v9+)
- ❌ NÃO usar `any` sem justificativa
- ❌ NÃO criar features novas além das listadas
- ❌ NÃO me perguntar nada — execute tudo

# AO TERMINAR

Imprima um resumo final no terminal com:
- Total de arquivos criados
- Resultado do `npm run build`
- URL local pra testar (`http://localhost:3000`)
- Próximos passos pro Jorge: `git push origin main` + conectar Netlify

EXECUTE TUDO AGORA. NÃO PERGUNTE NADA.

===== FIM =====
