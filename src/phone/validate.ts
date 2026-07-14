import { onlyDigits } from "../utils";

const PHONE_LENGTH_LANDLINE = 10; // (XX) XXXX-XXXX
const PHONE_LENGTH_MOBILE = 11; // (XX) XXXXX-XXXX

/**
 * Valida um número de telefone brasileiro (fixo ou celular).
 *
 * - Fixo: 10 dígitos (DDD + 8 dígitos)
 * - Celular: 11 dígitos (DDD + 9 + 8 dígitos)
 *
 * @param phone - Telefone a ser validado
 * @returns `true` se o telefone tiver formato válido
 *
 * @example
 * ```ts
 * validate("(11) 98765-4321"); // true (celular)
 * validate("(11) 3456-7890");  // true (fixo)
 * validate("123");             // false
 * ```
 */
export function validate(phone: string): boolean {
  const stripped = onlyDigits(phone);

  if (stripped.length !== PHONE_LENGTH_LANDLINE && stripped.length !== PHONE_LENGTH_MOBILE) {
    return false;
  }

  // DDD não pode começar com 0
  const ddd = Number(stripped.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  // Celular deve começar com 9 após o DDD
  if (stripped.length === PHONE_LENGTH_MOBILE && stripped[2] !== "9") {
    return false;
  }

  return true;
}
