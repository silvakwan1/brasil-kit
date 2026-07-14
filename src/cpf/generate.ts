import { randomDigit } from "../utils";
import { format } from "./format";

const WEIGHTS_FIRST = [10, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

function calculateCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Gera um CPF válido aleatório.
 *
 * @param formatted - Se `true`, retorna com máscara (padrão: `false`)
 * @returns CPF válido gerado aleatoriamente
 *
 * @example
 * ```ts
 * generate();      // "52998224725"
 * generate(true);  // "529.982.247-25"
 * ```
 */
export function generate(formatted = false): string {
  const base = Array.from({ length: 9 }, () => randomDigit());

  const firstCheck = calculateCheckDigit(base, WEIGHTS_FIRST);
  base.push(firstCheck);

  const secondCheck = calculateCheckDigit(base, WEIGHTS_SECOND);
  base.push(secondCheck);

  const cpf = base.join("");
  return formatted ? format(cpf) : cpf;
}
