# Sokra Landing Page

Landing page editorial e minimalista para a Sokra, um tutor de estudo baseado no método socrático.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Motion for React
- Componentes no padrão shadcn/ui
- Brevo para armazenamento e automação da waitlist

## Como executar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Configurar a Brevo sem domínio próprio

### 1. Criar a conta e a lista

1. Crie uma conta gratuita na Brevo.
2. Entre em **Contatos > Listas**.
3. Crie uma lista chamada `Waitlist Sokra`.
4. Abra a lista e copie o ID numérico exibido na URL ou nos detalhes da lista.

### 2. Criar a chave de API

1. Entre em **Configurações > SMTP e API > Chaves de API**.
2. Crie uma nova chave.
3. Copie o valor imediatamente; ele não será exibido novamente.

### 3. Configurar o projeto

Crie `.env.local` na raiz usando `.env.example` como base:

```env
BREVO_API_KEY=xkeysib-sua-chave-aqui
BREVO_LIST_ID=2
```

Nunca coloque `BREVO_API_KEY` em variável iniciada por `NEXT_PUBLIC_` e nunca envie `.env.local` ao GitHub.

### 4. Criar um remetente sem domínio

1. Na Brevo, abra **Configurações > Remetentes, domínios e IPs > Remetentes**.
2. Clique em **Adicionar um remetente**.
3. Use `Sokra` como nome e um endereço seu, como Gmail, como e-mail.
4. Digite na Brevo o código de seis dígitos recebido nesse endereço.

O Gmail pode ser usado no início, mas a entrega tende a ser melhor quando um domínio próprio for autenticado futuramente.

### 5. Automatizar o e-mail de boas-vindas

1. Na Brevo, abra **Automações** e crie uma automação.
2. Escolha como gatilho **Contato adicionado a uma lista**.
3. Selecione `Waitlist Sokra`.
4. Adicione a ação **Enviar um e-mail**.
5. Crie e ative o e-mail de confirmação.
6. Ative a automação.

Depois disso, o fluxo será:

```text
Formulário da landing
  -> POST /api/waitlist
  -> contato criado ou atualizado na lista
  -> automação da Brevo
  -> e-mail de boas-vindas
```

## Funcionamento da integração

A rota `app/api/waitlist/route.ts`:

- valida e normaliza o e-mail;
- rejeita dados inválidos;
- usa um campo honeypot simples contra bots;
- envia a chave somente no servidor;
- adiciona o contato à lista configurada;
- usa `updateEnabled: true`, evitando erro quando o endereço já existe.

O formulário exibe a mensagem retornada pela API em caso de falha e só mostra sucesso após a Brevo confirmar o cadastro.

## Publicar na Vercel

Em **Project Settings > Environment Variables**, cadastre:

- `BREVO_API_KEY`
- `BREVO_LIST_ID`

Depois faça um novo deploy.
