E-commerce for selling 3d products.

## Configuração da API

Em desenvolvimento, a API usa `http://localhost:3000/api` por padrão.

Para produção, defina `VITE_API_URL` antes de executar o build:

```bash
VITE_API_URL=https://api.example.com/api pnpm build
```

Não inclua arquivos `.env` com valores reais no repositório. Use `.env.example`
como referência para a configuração local.
