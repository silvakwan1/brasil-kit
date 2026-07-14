# Contribuindo para o brasil-kit

Obrigado por se interessar em contribuir! 🎉

## Setup local

```bash
# Clone o repositório
git clone https://github.com/silvakwan1/brasil-kit.git
cd brasil-kit

# Instale as dependências
npm install

# Rode os testes
npm test

# Rode o build
npm run build
```

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run build` | Compila a biblioteca (ESM + CJS) |
| `npm run dev` | Build em modo watch |
| `npm test` | Roda os testes unitários |
| `npm run test:watch` | Testes em modo watch |
| `npm run lint` | Verifica lint e formatação |
| `npm run lint:fix` | Corrige lint e formatação automaticamente |
| `npm run check` | Lint + type check completo |

## Estrutura do projeto

```
src/
├── cpf/        # Validação, formatação e geração de CPF
├── cnpj/       # Validação, formatação e geração de CNPJ
├── cep/        # Validação e formatação de CEP
├── phone/      # Validação e formatação de telefone
├── utils/      # Funções auxiliares compartilhadas
└── index.ts    # Barrel export
```

## Diretrizes

- Use **funções puras** — sem estado, sem side effects
- Escreva **testes** para toda nova funcionalidade
- Mantenha **zero dependências** de produção
- Documente funções públicas com **JSDoc**
- Siga o estilo definido no **Biome**

## Fluxo de contribuição

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Faça suas mudanças e adicione testes
4. Rode `npm run check` para garantir que está tudo OK
5. Commit com mensagem descritiva
6. Abra um Pull Request

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [licença MIT](./LICENSE).
