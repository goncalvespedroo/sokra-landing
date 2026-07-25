# Sokra Landing Page

Landing page editorial e minimalista para a Sokra, um tutor de estudo baseado no método socrático.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Motion for React
- Componentes no padrão shadcn/ui

## Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Formulário

O formulário contém validação simples de e-mail, estado de carregamento e confirmação de sucesso no cliente, sem recarregar a página. O atraso atual é apenas demonstrativo. Substitua o trecho indicado em `components/waitlist-form.tsx` por uma Server Action ou rota de API para persistir os contatos.
