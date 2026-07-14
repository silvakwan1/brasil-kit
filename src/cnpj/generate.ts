import { randomDigit } from "../utils";
import { format } from "./format";

const WEIGHTS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function calculateCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Gera um CNPJ válido aleatório.
 *
 * @param formatted - Se `true`, retorna com máscara (padrão: `false`)
 * @returns CNPJ válido gerado aleatoriamente
 *
 * @example
 * ```ts
 * generate();      // "11222333000181"
 * generate(true);  // "11.222.333/0001-81"
 * ```
 */
export function generate(formatted = false): string {
  const base = Array.from({ length: 8 }, () => randomDigit());

  // Filial (geralmente 0001)
  base.push(0, 0, 0, 1);

  const firstCheck = calculateCheckDigit(base, WEIGHTS_FIRST);
  base.push(firstCheck);

  const secondCheck = calculateCheckDigit(base, WEIGHTS_SECOND);
  base.push(secondCheck);

  const cnpj = base.join("");
  return formatted ? format(cnpj) : cnpj;
}
