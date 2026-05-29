# Compor Acabamentos — Site Next.js

Site da Compor Acabamentos (Horizontina/RS) — pisos, porcelanatos, revestimentos e acabamentos de alto padrão.

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v3**
- **Firebase** (Firestore + Auth + Storage)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

> Credenciais Firebase já estão em `.env.local` — não commitar este arquivo.

## Estrutura de pastas

```
src/
├── app/           → Rotas Next.js (homepage, /admin, /admin/login)
├── components/
│   ├── layout/    → Header, Footer, WhatsAppFloat, BackToTop
│   ├── sections/  → HeroSlider, Features, Showroom, Catalog, Reviews, Location, CTAContact
│   ├── modals/    → ProductModal, CartModal, LoginModal
│   ├── admin/     → AdminShell, Dashboard, ProductsManager, ProductForm, StoreConfig, AppearanceConfig, BackupManager
│   └── ui/        → Button, ProductCard, Modal, Input, Toast
├── context/       → AuthContext, CartContext, SiteDataContext
├── hooks/         → useAuth, useCart, useSiteData, useScrollDirection
├── lib/           → firebase.ts, firestore.ts, auth.ts, format.ts
├── types/         → index.ts (todas as interfaces)
└── data/          → categories.ts, reviews.ts
```

## Como adicionar produtos

1. Acesse `/admin/login` e entre com seu email/senha do Firebase Auth
2. Clique em **Produtos → + Novo Produto**
3. Preencha: nome, preço, categoria, badge, fotos (URLs), descrição, specs
4. Marque "Visível" para aparecer no catálogo público
5. Marque "Destaque" para aparecer no Showroom
6. Clique em **CRIAR PRODUTO**

## Onde mexer em cada coisa

| Quero alterar... | Vá em... |
|---|---|
| Cores do site | `src/app/globals.css` → variáveis `:root` |
| Categorias do catálogo | `src/data/categories.ts` |
| Reviews dos clientes | `src/data/reviews.ts` |
| Textos do hero | Admin → Aparência → Textos dos Slides |
| Imagens do hero | Admin → Aparência → Imagens do Hero |
| Logo do site | Admin → Aparência → Logo |
| Endereço / WhatsApp das lojas | Admin → Configurações da Loja |
| Horário de funcionamento | Admin → Configurações da Loja |
| Produtos | Admin → Produtos |
| Backup dos dados | Admin → Backup |
| Regras de segurança Firestore | `firestore.rules` |

## Deploy na Netlify

1. Faça push para o GitHub:
   ```bash
   git push origin main
   ```

2. Na Netlify:
   - New site → Import from GitHub
   - Selecione o repositório `compor-acabamentos`
   - Build command: `npm run build`
   - Publish directory: `.next`
   - **Adicione as variáveis de ambiente** (copie do `.env.local`):
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

3. Instale o plugin Netlify Next.js (já configurado no `netlify.toml`)

## Regras Firestore

Publique o arquivo `firestore.rules` no console Firebase (Firestore → Rules) para garantir:
- Leitura pública (site visível)
- Escrita somente para usuários autenticados (admin)

## Próximos passos

- [ ] `git push origin main`
- [ ] Conectar repositório na Netlify
- [ ] Configurar domínio custom (composacabamentos.com.br)
- [ ] Publicar `firestore.rules` no console Firebase
- [ ] Criar usuário admin no Firebase Auth (Authentication → Add user)
