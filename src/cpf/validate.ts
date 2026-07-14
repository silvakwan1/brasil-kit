import { allSameDigit, onlyDigits } from "../utils";

const CPF_LENGTH = 11;
const WEIGHTS_FIRST = [10, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_SECOND = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

function calculateCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, digit, i) => acc + digit * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Valida um CPF (com ou sem máscara).
 *
 * @param cpf - CPF a ser validado (ex: "123.456.789-09" ou "12345678909")
 * @returns `true` se o CPF for válido
 *
 * @example
 * ```ts
 * validate("529.982.247-25"); // true
 * validate("111.111.111-11"); // false
 * ```
 */
export function validate(cpf: string): boolean {
  const stripped = onlyDigits(cpf);

  if (stripped.length !== CPF_LENGTH) return false;
  if (allSameDigit(stripped)) return false;

  const digits = stripped.split("").map(Number);

  const firstCheck = calculateCheckDigit(digits.slice(0, 9), WEIGHTS_FIRST);
  if (firstCheck !== digits[9]) return false;

  const secondCheck = calculateCheckDigit(digits.slice(0, 10), WEIGHTS_SECOND);
  if (secondCheck !== digits[10]) return false;

  return true;
}
