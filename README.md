<div align="center">
  <img src="./assets/banner.png" alt="brasil-kit" width="100%" />
</div>

# 🇧🇷 brasil-kit

<p align="center">
  <a href="https://www.npmjs.com/package/brasil-kit">
    <img src="https://img.shields.io/npm/v/brasil-kit.svg" alt="versão npm" />
  </a>
  <a href="https://github.com/silvakwan1/brasil-kit/actions/workflows/ci.yml">
    <img src="https://github.com/silvakwan1/brasil-kit/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Licença MIT" />
  </a>
</p>

Utilitários para dados brasileiros — **CPF, CNPJ, CEP, telefone**. Validação, formatação e geração.

- ✅ **Zero dependências**
- 🌳 **Tree-shakeable** — importe só o que precisar
- 📦 **ESM + CJS** — funciona em qualquer ambiente
- 🔒 **TypeScript** — tipos inclusos
- ⚡ **Leve** — funções puras, sem estado

## Instalação

```bash
npm install brasil-kit
```

## Uso

```typescript
import { cpf, cnpj, cep, phone } from "brasil-kit";
```

### CPF

```typescript
// Validação
cpf.validate("529.982.247-25"); // true
cpf.validate("111.111.111-11"); // false

// Formatação
cpf.format("52998224725"); // "529.982.247-25"
cpf.strip("529.982.247-25"); // "52998224725"

// Geração
cpf.generate(); // "52998224725"
cpf.generate(true); // "529.982.247-25"
```

### CNPJ

```typescript
// Validação
cnpj.validate("11.222.333/0001-81"); // true
cnpj.validate("11.111.111/1111-11"); // false

// Formatação
cnpj.format("11222333000181"); // "11.222.333/0001-81"
cnpj.strip("11.222.333/0001-81"); // "11222333000181"

// Geração
cnpj.generate(); // "11222333000181"
cnpj.generate(true); // "11.222.333/0001-81"
```

### CEP

```typescript
// Validação
cep.validate("01001-000"); // true
cep.validate("0100100"); // false (7 dígitos)

// Formatação
cep.format("01001000"); // "01001-000"
cep.strip("01001-000"); // "01001000"
```

### Telefone

```typescript
// Validação
phone.validate("(11) 98765-4321"); // true (celular)
phone.validate("(11) 3456-7890"); // true (fixo)

// Formatação
phone.format("11987654321"); // "(11) 98765-4321"
phone.format("1134567890"); // "(11) 3456-7890"
phone.strip("(11) 98765-4321"); // "11987654321"
```

## API

### `cpf`

| Função | Descrição |
|---|---|
| `validate(cpf: string): boolean` | Valida CPF (com/sem máscara) |
| `format(cpf: string): string` | Formata para `XXX.XXX.XXX-XX` |
| `strip(cpf: string): string` | Remove formatação |
| `generate(formatted?: boolean): string` | Gera CPF válido aleatório |

### `cnpj`

| Função | Descrição |
|---|---|
| `validate(cnpj: string): boolean` | Valida CNPJ (com/sem máscara) |
| `format(cnpj: string): string` | Formata para `XX.XXX.XXX/XXXX-XX` |
| `strip(cnpj: string): string` | Remove formatação |
| `generate(formatted?: boolean): string` | Gera CNPJ válido aleatório |

### `cep`

| Função | Descrição |
|---|---|
| `validate(cep: string): boolean` | Valida CEP (8 dígitos) |
| `format(cep: string): string` | Formata para `XXXXX-XXX` |
| `strip(cep: string): string` | Remove formatação |

### `phone`

| Função | Descrição |
|---|---|
| `validate(phone: string): boolean` | Valida telefone (fixo/celular) |
| `format(phone: string): string` | Formata para `(XX) XXXX-XXXX` ou `(XX) XXXXX-XXXX` |
| `strip(phone: string): string` | Remove formatação |

## Licença

[MIT](./LICENSE) © kauan da silva ferreira
