import { allSameDigit, onlyDigits } from "../utils";

const CNPJ_LENGTH = 14;
const WEIGHTS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

function calculateCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Valida um CNPJ (com ou sem máscara).
 *
 * @param cnpj - CNPJ a ser validado (ex: "11.222.333/0001-81" ou "11222333000181")
 * @returns `true` se o CNPJ for válido
 *
 * @example
 * ```ts
 * validate("11.222.333/0001-81"); // true
 * validate("11.111.111/1111-11"); // false
 * ```
 */
export function validate(cnpj: string): boolean {
  const stripped = onlyDigits(cnpj);

  if (stripped.length !== CNPJ_LENGTH) return false;
  if (allSameDigit(stripped)) return false;

  const digits = stripped.split("").map(Number);

  const firstCheck = calculateCheckDigit(digits.slice(0, 12), WEIGHTS_FIRST);
  if (firstCheck !== digits[12]) return false;

  const secondCheck = calculateCheckDigit(digits.slice(0, 13), WEIGHTS_SECOND);
  if (secondCheck !== digits[13]) return false;

  return true;
}
