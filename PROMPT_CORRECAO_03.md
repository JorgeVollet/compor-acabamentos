# PROMPT DE CORREÇÃO 03 — Compor Acabamentos (Logo Footer)

Copie tudo entre `===== INÍCIO =====` e `===== FIM =====` e cole no Claude Code rodando dentro de `compor-next/`.

===== INÍCIO =====

# CONTEXTO

A logo do Footer está errada — está mostrando a logo ANTIGA da marca (provavelmente vindo de `assets.logo` do Firestore, que é uma URL externa do Bing antiga). 

A logo correta é a mesma que está no Header: o arquivo local `/logocompor2.png` (em `public/logocompor2.png`).

# OBJETIVO

Fazer o Footer usar a MESMA logo do Header — sempre `/logocompor2.png`, ignorando o que vier de `assets.logo` do Firestore.

# REGRA

NÃO PERGUNTAR NADA. Execute e termine.

# CORREÇÃO

Abra `src/components/layout/Footer.tsx` e localize onde a logo é renderizada (provavelmente está usando `assets.logo` ou `assets?.logo` como `src` da imagem).

**Substitua o `src` da logo do Footer por `/logocompor2.png`** (caminho fixo, sem usar `assets`).

Exemplo do que deve ficar:

```tsx
// ANTES (errado):
<img src={assets?.logo || '/logocompor2.png'} alt="Logo Compor Acabamentos" ... />
// ou
<Image src={assets?.logo || '/logocompor2.png'} alt="..." ... />

// DEPOIS (correto):
<img 
  src="/logocompor2.png" 
  alt="Logo Compor Acabamentos" 
  style={{ display: 'block', maxHeight: '70px', width: 'auto', objectFit: 'contain', margin: '0 0 1.5rem 0' }}
/>
```

Se estiver usando `next/image`, troque por `<img>` HTML normal (mais simples para logos com aspect ratio variável) OU mantenha `next/image` com `width` e `height` fixos (ex: width={200} height={70}).

# IMPORTANTE

- Se a prop `assets` não for usada em mais nada dentro do Footer, pode REMOVER a prop do componente também (limpar código).
- Se for usada (ex: pra `logoSubText`), MANTENHA a prop mas só não use mais ela pra logo.

# PASSO FINAL

1. Salve o arquivo
2. Rode `npm run build` pra garantir que compila
3. Imprima: "✅ Logo do Footer corrigida. Atualize a página (Ctrl+Shift+R) e confira."

# CHECKLIST

- [ ] Footer usa `/logocompor2.png` (mesma do Header)
- [ ] Não puxa mais `assets.logo` do Firestore pra logo do Footer
- [ ] `npm run build` passa sem erros
- [ ] Aparência igual ao Header (mesma logo)

EXECUTE TUDO AGORA. NÃO PERGUNTE NADA.

===== FIM =====
