E-commerce for selling 3d products.

## Configuração da API

Em desenvolvimento, a API usa `http://localhost:3000/api` por padrão.

Para produção, defina `VITE_API_URL` antes de executar o build:

```bash
VITE_API_URL=https://api.example.com/api pnpm build
```

Não inclua arquivos `.env` com valores reais no repositório. Use `.env.example`
como referência para a configuração local.

## Painel administrativo

O painel administrativo é mantido no projeto `ecommerce-admin`. Este
repositório contém apenas a experiência da loja.

## Deploy na Vercel (SPA com React Router)

Este projeto usa `BrowserRouter`, então as rotas da loja precisam de fallback
para `index.html` em produção.

O arquivo `vercel.json` já inclui essa configuração:

- primeiro tenta arquivos reais (`handle: filesystem`);
- depois redireciona qualquer rota para `/index.html`.

Com isso, acessos diretos e refresh em URLs da loja deixam de
retornar `404 NOT_FOUND`.
