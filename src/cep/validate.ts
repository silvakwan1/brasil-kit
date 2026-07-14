import { onlyDigits } from "../utils";

const CEP_LENGTH = 8;

/**
 * Valida um CEP (com ou sem máscara).
 *
 * @param cep - CEP a ser validado (ex: "01001-000" ou "01001000")
 * @returns `true` se o CEP tiver formato válido (8 dígitos)
 *
 * @example
 * ```ts
 * validate("01001-000"); // true
 * validate("0100100");   // false
 * ```
 */
export function validate(cep: string): boolean {
  const stripped = onlyDigits(cep);
  return stripped.length === CEP_LENGTH;
}
